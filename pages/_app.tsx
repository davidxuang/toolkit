import { useEffect, useState } from 'react';
import type { AppProps } from 'next/app'
import { GriffelRenderer } from '@griffel/core'
import { createDOMRenderer, RendererProvider, SSRProvider, FluentProvider, webDarkTheme, webLightTheme } from '@fluentui/react-components';
import '../styles/globals.css'

const useThemeDetector = () => {
  const getCurrentTheme = () => window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [isDarkTheme, setIsDarkTheme] = useState(getCurrentTheme());  
  const mqListener = ((event: MediaQueryListEvent) => {
      setIsDarkTheme(event.matches);
  });
  
  useEffect(() => {
    const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
    darkThemeMq.addEventListener('change', mqListener);
    return () => darkThemeMq.removeEventListener('change', mqListener);
  }, []);
  return isDarkTheme;
}

function MyApp({ Component, pageProps, renderer }: AppProps & { renderer: GriffelRenderer }) {
  const theme = useThemeDetector() ? webDarkTheme : webLightTheme;

  return (
    // @ts-ignore
    <RendererProvider renderer={renderer || createDOMRenderer()}><SSRProvider> 
      <FluentProvider theme={theme}>
        <Component {...pageProps} />
      </FluentProvider>
    </SSRProvider></RendererProvider>
  );}

export default MyApp
