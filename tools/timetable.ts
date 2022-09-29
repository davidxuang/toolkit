import assert from 'assert';
import pad from 'pad';

type ValueOrArray<T> = T | ValueOrArray<T>[];
type NestedStringArray = ValueOrArray<string>;

type TimeBySubTerminal = string;
type TimeByTerminal = TimeBySubTerminal[] | string;
type TimeByOrientation = TimeByTerminal[];
type TimeByDay = TimeByOrientation[];
type Timetable = Map<string, TimeByDay[]>;

const compareNestedStringArray = (
  x: NestedStringArray,
  y: NestedStringArray
): boolean => {
  if (x instanceof Array) {
    if (x.length != y.length) {
      return false;
    } else {
      return x.filter((v, i) => !compareNestedStringArray(v, y[i])).length == 0;
    }
  } else {
    return x === y;
  }
};

const deduplicateDays = (timetable: Timetable) => {
  let dedup = true;
  timetable.forEach((days) => {
    if (days.length > 1) {
      days.slice(1).forEach((day) => {
        if (!compareNestedStringArray(days[0], day)) {
          console.log('---');
          console.log(days[0]);
          console.log(day);
          dedup = false;
        }
      });
    }
  });
  if (dedup) {
    return new Map(
      Array.from(timetable.entries()).map(([station, days]) => [
        station,
        [days[0]],
      ])
    );
  } else {
    return timetable;
  }
};

const luaifyNestedStringArray = (
  array: NestedStringArray,
  padding: number = 0
): string => {
  if (array instanceof Array) {
    return `{ ${array
      .map((child) => luaifyNestedStringArray(child, padding))
      .join(', ')} }`;
  } else if (array == 'nil') {
    return pad(padding, `nil`);
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
const luaifyTimetable = (timetable: Timetable, padding: number) => {
  timetable = deduplicateDays(timetable);
  return `		{ 
			stations = ${luaifyNestedStringArray([...timetable.keys()])},
      data = {
${Array.from(timetable)
  .map(
    ([key, value]) =>
      `				${pad(`['${key}']`, padding)} = ${luaifyNestedStringArray(value, 7)},`
  )
  .join('\n')}
      }
		}`;
};

const parseLines: { [system: string]: (page: Document) => [string, string][] } =
  {
    CRT: (page) => {
      return Array.from(page.querySelector('div.result-line-list')?.childNodes!)
        .filter((elem) => (elem as HTMLDivElement).id)
        .map((elem) => {
          return [
            (elem as HTMLDivElement).id.substring(9),
            (elem as HTMLDivElement).innerText.trim(),
          ];
        });
    },
  };

const getItemsTextByIndex = (
  items: HTMLElement[],
  indices: number | number[],
  offset: number = 0,
  closed: boolean
) => {
  if (indices instanceof Array) {
    return indices.map((index) =>
      items[index + offset].innerHTML.trim().replace('--', closed ? 'nil' : '')
    );
  } else {
    return items[indices + offset].innerHTML
      .trim()
      .replace('--', closed ? 'nil' : '');
  }
};

type IndicesByTerminal = [
  number | number[], // first down
  number | number[], // first up
  number | number[], // last down
  number | number[] // last up
];

/**
 * 解析时刻表
 * @param table 时刻表HTML表格对象
 * @returns 时刻表对象
 */
const parseTimetable: {
  [system: string]: (page: Document, line: string) => Timetable;
} = {
  CRT: (page, line): Timetable => {
    let table = page!.querySelector(
      'div.result-line-time-list > table#clay10_' + line
    )! as HTMLTableElement;

    let [days, groups, columns] = [0, 1, 2].map((i) =>
      [...table.tHead!.rows[i].querySelectorAll(`th.bg-f7f7f7`)]
        .filter((elem) => elem.innerHTML.trim().length > 2)
        .map((elem) => elem as HTMLTableCellElement)
    );

    if (days.length == 0) {
      days = [document.createElement('th')];
      days[0].colSpan = groups.map((g) => g.colSpan).reduce((p, c) => p + c, 0);
    }

    console.log(days.length);

    if (![1, 2].includes(days.length)) {
      throw days.length;
    } else if (groups.length % days.length != 0 || groups.length < 2) {
      throw groups.length;
    } else if (columns.length % days.length != 0 || columns.length < 2) {
      throw columns.length;
    }

    let dayWidth = days[0].colSpan;

    let dayOffsets: number[] = [];
    for (let i = 0; i < days.length; i++) {
      assert(days[i].colSpan == dayWidth);
      dayOffsets.push(i * dayWidth);
    }

    let indices: IndicesByTerminal = [[], [], [], []];

    if (
      groups.length / days.length == 2 &&
      columns.length / groups.length == 2
    ) {
      indices = [1, 2, 3, 4];
    } else if (groups.length / days.length >= 2) {
      let i = 0;
      let dayWidth = days[0].colSpan;
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
        if (i >= dayWidth) {
          break;
        }
      }
      for (let i = 0; i < indices.length; i++) {
        indices[i] =
          (indices[i] as number[]).length == 1
            ? (indices[i] as number[])[0]
            : indices[i];
      }
    } else {
      throw groups.length;
    }

    let rows = [...table.tBodies[0].rows].map((row) => [...row.cells]);

    let timetable: Timetable = new Map();

    for (var row of rows) {
      let name = row[0].innerHTML.trim().replace('航站楼', '');
      if (!name || name == '--') {
        break;
      }

      timetable.set(
        name,
        dayOffsets.map((offset) => {
          let closed = // 判断车站是否关闭
            row.slice(1).filter((cell) => cell.innerHTML.trim().length > 2)
              .length == 0;
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
  },
};

export { luaifyTimetable, parseLines, parseTimetable };
