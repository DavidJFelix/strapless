import type {AppProps} from 'next/app'
import {ThemeProvider, theme, ITheme, CSSReset} from '@chakra-ui/core'

const appTheme: ITheme = {
  ...theme,
  fonts: {
    ...theme.fonts,
    body: `-apple-system, system-ui, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue' Ubuntu, Arial, sans-serif`,
  },
}

export default function Strapless({Component, pageProps}: AppProps) {
  return (
    <ThemeProvider theme={appTheme}>
      <CSSReset />
      <Component {...pageProps} />
    </ThemeProvider>
  )
}
