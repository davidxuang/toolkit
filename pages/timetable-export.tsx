import axios from 'axios';
import wcwidth from 'wcwidth';

import React, { useEffect, useRef, useState } from 'react';
import { NextPage } from 'next';
import { Button, makeStyles, Spinner } from '@fluentui/react-components';
import { Select } from '@fluentui/react-components/unstable';

import { luaifyTimetable, parseTimetableCRT } from '../tools/timetable';
import FluentCodeBlock from '../components/FluentCodeBlock';
import Head from 'next/head';

const styles = makeStyles({
  main: {
    marginInline: 'auto',
    paddingBlock: '2rem',
    maxWidth: '64rem',
    minHeight: '100vh',
    backgroundColor: 'var(--colorNeutralBackground2)',
  },
  actionsBar: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    '> span': {
      flexGrow: 0.05,
    },
    '> div': {
      flexGrow: 0.05,
    },
    '> button': {
      flexGrow: 0.05,
    },
  },
});

const TimetableExport: NextPage = () => {
  const classes = styles();
  let originPage = useRef<Document>();

  const [ready, setReady] = useState(false);
  const [lineId, setLineId] = useState('');
  const [luaString, setLuaString] = useState('');

  useEffect(() => {
    setLineId('9');
    axios
      .get(
        'https://corsproxy.io/?https%3A%2F%2Fwww.cqmetro.cn%2Friding-guide.html'
      )
      .then((response) => {
        originPage.current = new DOMParser().parseFromString(
          response.data as string,
          'text/html'
        );
        setReady(true);
      });
  }, []);

  const onExport = async () => {
    let table = originPage.current!.querySelector(
      'div.result-line-time-list > table#clay10_' + lineId
    )! as HTMLTableElement;

    let timetable = parseTimetableCRT(table);

    let namePad =
      Math.max(...[...timetable.keys()].map((str) => wcwidth(str))) + 4;
    setLuaString(luaifyTimetable(timetable, namePad));
  };

  return (
    <div>
      <Head>
        <title>Wikipedia时刻表导出</title>
      </Head>

      <main className={classes.main}>
        <div className={classes.actionsBar}>
          <Select>
            <option value="CRT">重庆轨道交通</option>
          </Select>
          <div></div>
          <Select onChange={(e) => setLineId(e.target.value)}>
            <option value="9">环线</option>
            <option value="1">1号线</option>
            <option value="2">2号线</option>
            <option value="3">3号线</option>
            <option value="4">4号线</option>
            <option value="5">5号线</option>
            <option value="6">6号线</option>
            <option value="7">国博线</option>
            <option value="10">9号线</option>
            <option value="8">10号线</option>
          </Select>
          <div></div>
          <Button onClick={onExport} disabled={!ready}>
            {ready ? '导出' : <Spinner size="tiny" />}
          </Button>
        </div>
        <FluentCodeBlock language="lua">{luaString}</FluentCodeBlock>
      </main>
    </div>
  );
};

export default TimetableExport;
