import axios from 'axios';
import wcwidth from 'wcwidth';

import React, { useState } from 'react';
import { NextPage } from 'next';
import { Button, Spinner, makeStyles } from '@fluentui/react-components';
import { Select } from '@fluentui/react-components/unstable';

import {
  luaifyTimetable,
  parseLines,
  parseTimetable,
} from '../tools/timetable';
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

enum Status {
  Initial = 0,
  Loading = 1,
  Loaded = 2,
}

const TimetableExport: NextPage = () => {
  const classes = styles();

  const [system, setSystem] = useState('CRT');
  const [status, setStatus] = useState(Status.Initial);
  const [page, setPage] = useState<Document>();
  const [lines, setLines] = useState<[string, string][]>();
  const [line, setLine] = useState('');
  const [lua, setLua] = useState('');

  // const corsProxies = [
  //   'https://api.allorigins.win/get?url=',
  //   'https://corsproxy.io/?',
  // ];
  const systemPages: { [key: string]: () => string[] } = {
    CRT: () => {
      return ['https://mirror.7355608.best/crt/riding-guide.html'];
    },
  };

  const onSelectSystem = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSystem(e.target.value);
    setLines([]);
    setPage(undefined);
    setStatus(Status.Initial);
  };

  const onDownload = async () => {
    setStatus(Status.Loading);
    Promise.any(systemPages[system]().map((url) => axios.get(url))).then(
      (response) => {
        let _page: Document;
        if (response.headers['content-type'].startsWith('application/json')) {
          _page = new DOMParser().parseFromString(
            response.data.contents,
            'text/html'
          );
        } else {
          _page = new DOMParser().parseFromString(
            response.data as string,
            'text/html'
          );
        }
        setPage(_page);
        let _lines = parseLines[system](_page!);
        setLines(_lines);
        setLine(_lines?.[0]?.[0] ?? '');
        setStatus(Status.Loaded);
      }
    );
  };

  const onExport = async () => {
    let timetable = parseTimetable[system](page!, line);

    let namePad =
      Math.max(...[...timetable.keys()].map((str) => wcwidth(str))) + 4;
    setLua(luaifyTimetable(timetable, namePad));
  };

  return (
    <div>
      <Head>
        <title>Wikipedia时刻表导出</title>
      </Head>

      <main className={classes.main}>
        <div className={classes.actionsBar}>
          <Select onChange={onSelectSystem}>
            <option value="CRT">重庆轨道交通</option>
          </Select>
          <div></div>
          <Button onClick={onDownload}>
            {status == Status.Loading ? <Spinner size="tiny" /> : '下载'}
          </Button>
          <div></div>
          <Select onChange={(e) => setLine(e.target.value)}>
            {lines?.map(([id, name]) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </Select>
          <div></div>
          <Button onClick={onExport} disabled={status != Status.Loaded}>
            导出
          </Button>
        </div>
        <FluentCodeBlock language="lua">{lua}</FluentCodeBlock>
      </main>
    </div>
  );
};

export default TimetableExport;
