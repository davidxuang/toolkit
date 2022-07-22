import assert from 'assert';
import pad from 'pad';

type ValueOrArray<T> = T | ValueOrArray<T>[];
type NestedStringArray = ValueOrArray<string>;

type TimeBySubterminal = string;
type TimeByTerminal = TimeBySubterminal[] | string;
type TimeByOrientation = TimeByTerminal[];
type TimeByDay = TimeByOrientation[];
type Timetable = Map<string, TimeByDay[]>;

const luaifyNestedStringArray = (
  array: NestedStringArray,
  padding: number = 0
): string => {
  if (array instanceof Array) {
    return `{ ${array
      .map((child) => luaifyNestedStringArray(child, padding))
      .join(', ')} }`;
  } else {
    return pad(padding, `'${array}'`);
  }
};

/**
 * 将时刻表对象序列化为Lua对象
 * @param timetable 时刻表
 * @param padding 站名文本宽度
 * @returns Lua对象字符串
 */
const luaifyTimetable = (timetable: Timetable, padding: number) => `		{ 
			stations = ${luaifyNestedStringArray([...timetable.keys()])},
${Array.from(timetable)
  .map(
    ([key, value]) =>
      `			${pad(`['${key}']`, padding)} = ${luaifyNestedStringArray(value, 7)},`
  )
  .join('\n')}
		}`;

const getItemsTextByIndex = (
  items: HTMLElement[],
  indices: number | number[],
  offset: number = 0,
  closed: boolean
) => {
  if (indices instanceof Array) {
    return indices.map((index) =>
      items[index + offset].innerHTML.trim().replace('--', closed ? '-' : '')
    );
  } else {
    return items[indices + offset].innerHTML
      .trim()
      .replace('--', closed ? '-' : '');
  }
};

type IndicesByTerminal = [
  number | number[], // first down
  number | number[], // first up
  number | number[], // last down
  number | number[] // last up
];

/**
 * 解析重庆轨道交通时刻表
 * @param table 时刻表HTML表格对象
 * @returns 时刻表对象
 */
const parseTimetableCRT = (table: HTMLTableElement): Timetable => {
  let [variants, groups, columns] = [0, 1, 2].map((i) =>
    [...table.tHead!.rows[i].querySelectorAll(`th.bg-f7f7f7`)]
      .filter((elem) => elem.innerHTML.trim().length > 2)
      .map((elem) => elem as HTMLTableCellElement)
  );

  if (![1, 2].includes(variants.length)) {
    throw variants.length;
  } else if (groups.length % variants.length != 0 || groups.length < 2) {
    throw groups.length;
  } else if (columns.length % variants.length != 0 || columns.length < 2) {
    throw columns.length;
  }

  let variantWidth = variants[0].colSpan;

  let variantOffsets: number[] = [];
  for (let i = 0; i < variants.length; i++) {
    assert(variants[i].colSpan == variantWidth);
    variantOffsets.push(i * variantWidth);
  }

  let indices: IndicesByTerminal = [[], [], [], []];

  if (
    groups.length / variants.length == 2 &&
    columns.length / groups.length == 2
  ) {
    indices = [1, 2, 3, 4];
  } else if (groups.length / variants.length >= 2) {
    let i = 0;
    let variantWidth = variants[0].colSpan;
    for (var group of groups) {
      let groupWidth = group.colSpan;
      if (group.innerHTML.trim().startsWith('首班车')) {
        for (let j = 0; j < groupWidth; j++) {
          let columnText = columns[i + j].innerHTML.trim();
          if (columnText.includes('↓') || columnText.includes('内环')) {
            (indices[0] as number[]).push(i + j + 1);
          } else {
            (indices[1] as number[]).push(i + j + 1);
          }
        }
      } else {
        for (let j = 0; j < groupWidth; j++) {
          let columnText = columns[i + j].innerHTML.trim();
          if (columnText.includes('↓') || columnText.includes('内环')) {
            (indices[2] as number[]).push(i + j + 1);
          } else {
            (indices[3] as number[]).push(i + j + 1);
          }
        }
      }
      i += groupWidth;
      if (i >= variantWidth) {
        break;
      }
    }
    for (let i = 0; i < indices.length; i++) {
      indices[i] =
        (indices[i] as number[]).length == 1
          ? (indices[i] as number[])[0]
          : indices[i];
    }
    console.log(indices);
  } else {
    throw groups.length;
  }

  let rows = [...table.tBodies[0].rows].map((row) => [...row.cells]);

  let timetable: Timetable = new Map();

  for (var row of rows) {
    let name = row[0].innerHTML.trim();
    if (!name || name == '--') {
      break;
    }

    timetable.set(
      row[0].innerHTML.trim(),
      variantOffsets.map((offset) => {
        let closed = // 判断车站是否关闭
          row.slice(1).filter((cell) => cell.innerHTML.trim().length > 2).length == 0;
        return [
          [
            getItemsTextByIndex(row, indices[0], offset, closed),
            getItemsTextByIndex(row, indices[1], offset, closed),
          ],
          [
            getItemsTextByIndex(row, indices[2], offset, closed),
            getItemsTextByIndex(row, indices[3], offset, closed),
          ],
        ];
      })
    );
  }

  return timetable;
};

export { luaifyTimetable, parseTimetableCRT };
