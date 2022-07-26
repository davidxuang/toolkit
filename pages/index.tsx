import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Image, makeStyles, Text } from '@fluentui/react-components';
import {
  Card,
  CardFooter,
  CardPreview,
} from '@fluentui/react-components/unstable';
import { WrenchScrewdriver24Regular } from '@fluentui/react-icons';

const styles = makeStyles({
  container: {
    marginInline: '2rem',
  },
  main: {
    minHeight: '100vh',
    paddingBlock: '4rem',
    display: 'flex',
    flexGrow: 1,
    flexShrink: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    '> h1': {
      marginBlockEnd: '.5em',
    },
  },
  grid: {
    maxWidth: '48rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    '@media (max-width: 600px)': {
      width: '100%',
      flexDirection: 'column',
    },
    '> div': {
      marginBlock: 'var(--fontSizeBase100)',
      marginInline: 'var(--fontSizeBase100)',
      '&:hover': {
        backgroundColor: 'var(--colorNeutralBackground2Hover)',
        '> div > img': { transform: 'scale(1.05)' },
      },
      '&:active': {
        backgroundColor: 'var(--colorNeutralBackground2Pressed)',
      },
    },
  },
  card: {
    width: '18rem',
    backgroundColor: 'var(--colorNeutralBackground2)',
    transitionProperty: 'background',
    transitionDuration: 'var(--durationNormal)',
    transitionTimingFunction: 'var(--curveDecelerateMid)',
    '> div:first-child': {
      height: '12rem',
      overflowX: 'clip',
      overflowY: 'clip',
      backgroundColor: 'var(--colorNeutralBackground2Hover)',
      '> img': {
        transitionProperty: 'transform',
        transitionDuration: 'var(--durationNormal)',
        transitionTimingFunction: 'var(--curveDecelerateMid)',
      },
      '> div > svg': {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%) scale(4)',
        opacity: 0.5,
      },
    },
    '> div:last-child > *': {
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
    },
  },
});

const Home: NextPage = () => {
  const classes = styles();
  const basePath = useRouter().basePath;

  return (
    <div className={classes.container}>
      <Head>
        <title>Toolkit</title>
        <meta name="description" content="@davidxuang's toolkit" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={classes.main}>
        <Text as="h1" size={900} weight="semibold">
          Toolkit
        </Text>

        <div className={classes.grid}>
          <Link href="/timetable-export">
            <Card className={classes.card}>
              <CardPreview>
                <Image
                  src={`${basePath}/tongyuanju-platform.png`}
                  alt="Photoshot of a platform of Tongyuanju station."
                  fit="cover"
                />
              </CardPreview>
              <CardFooter>
                <Text as="h2" size={500} weight="medium" wrap={true}>
                  Wikipedia时刻表导出
                </Text>
              </CardFooter>
            </Card>
          </Link>

          <Card className={classes.card}>
            <CardPreview>
              <div>
                <WrenchScrewdriver24Regular />
              </div>
            </CardPreview>
            <CardFooter>
              <Text as="h2" size={500} weight="medium" wrap={true}>
                More…
              </Text>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Home;
