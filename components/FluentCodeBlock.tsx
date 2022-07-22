import { CSSProperties, FunctionComponent } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

interface Props {
  language: string;
  children: string | string[];
}

const colors: { [key: string]: string } = {
  foreground: 'var(--colorNeutralForeground2)', // #c5c8c6
  background: 'var(--colorNeutralBackground2)', // #1e1e1e
  gray: 'var(--colorPaletteAnchorBorderActive)', // #676867
  lightGray: 'var(--colorPalettePlatinumBorderActive)', // #9A9B99
  red: 'var(--colorPaletteRedBorder2)', // #9B0000
  lightRed: 'var(--colorPaletteRedBorder2)', // #C7444A
  orange: 'var(--colorPalettePumpkinBorderActive)', // #CE6700
  lightOrange: 'var(--colorPalettePumpkinBorderActive)', // #D08442
  yellow: 'var(--colorPaletteGoldBorderActive)', // #D0B344
  lightYellow: 'var(--colorPaletteGoldBorderActive)', // #D9B700
  green: 'var(--colorPaletteForestBorderActive)', // #008200
  lightGreen: 'var(--colorPaletteForestBorderActive)', // #9AA83A
  teal: 'var(--colorPaletteSteelBorderActive)', // #408080
  lightTeal: 'var(--colorPaletteSteelBorderActive)', // #219186
  blue: 'var(--colorPaletteRoyalBlueBorderActive)', // #6089B4
  lightBlue: 'var(--colorPaletteRoyalBlueBorderActive)', // #8080FF
  purple: 'var(--colorPaletteGrapeBorderActive)', // #9872A2
  lightPurple: 'var(--colorPaletteGrapeBorderActive)', // #AE81FF
};

const fluentStyle: { [key: string]: CSSProperties } = {
  'pre[class*="language-"]': {
    color: colors.foreground,
    fontFamily: 'monospace',
    direction: 'ltr',
    textAlign: 'left',
    whiteSpace: 'pre',
    wordSpacing: 'normal',
    wordBreak: 'normal',
    wordWrap: 'normal',
    lineHeight: '1.5',
    MozTabSize: '2',
    OTabSize: '2',
    tabSize: '2',
    WebkitHyphens: 'none',
    MozHyphens: 'none',
    msHyphens: 'none',
    hyphens: 'none',
    padding: '1em',
    margin: '.5em 0',
    overflow: 'auto',
    background: colors.background,
  },
  'code[class*="language-"]': {
    color: colors.foreground,
    fontFamily: 'monospace',
    direction: 'ltr',
    textAlign: 'left',
    whiteSpace: 'pre',
    wordSpacing: 'normal',
    wordBreak: 'normal',
    wordWrap: 'normal',
    lineHeight: '1.5',
    MozTabSize: '2',
    OTabSize: '2',
    tabSize: '2',
    WebkitHyphens: 'none',
    MozHyphens: 'none',
    msHyphens: 'none',
    hyphens: 'none',
  },
  ':not(pre) > code[class*="language-"]': {
    padding: '.1em',
    borderRadius: '.3em',
    background: colors.background,
  },
  keyword: { color: colors.purple },
  builtin: { color: colors.lightGreen },
  'class-name': { color: colors.lightRed },
  'maybe-class-name': { color: colors.red },
  function: { color: colors.orange },
  boolean: { color: colors.teal },
  number: { color: colors.blue },
  string: { color: colors.lightGreen },
  char: { color: colors.lightBlue },
  symbol: { color: colors.lightBlue },
  regex: { color: colors.lightGreen },
  url: { color: colors.lightPurple },
  operator: { color: colors.purple },
  variable: { color: colors.blue },
  constant: { color: colors.foreground },
  property: { color: colors.gray },
  'property-access': { color: colors.blue },
  punctuation: { opacity: 0.75 },
  important: { color: colors.gray },
  comment: { color: colors.lightGray },
  tag: { color: colors.blue },
  'attr-name': { color: colors.yellow },
  'attr-value': { color: colors.lightGreen },
  namespace: { color: colors.red },
  prolog: { color: colors.lightGray },
  doctype: { color: colors.lightGray },
  cdata: { color: colors.lightGray },
  entity: { color: colors.purple },
  atrule: { color: colors.purple },
  selector: { color: colors.blue },
  inserted: { color: colors.lightTeal },
  deleted: { color: colors.lightRed },
};

const FluentCodeBlock: FunctionComponent<Props> = ({ language, children }) => {
  return (
    <SyntaxHighlighter language={language} style={fluentStyle}>
      {children}
    </SyntaxHighlighter>
  );
};

export default FluentCodeBlock;
