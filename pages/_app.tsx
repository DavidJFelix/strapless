import type {AppProps} from 'next/app'
import {ThemeProvider, theme, CSSReset} from '@chakra-ui/core'

export default function Strapless({Component, pageProps}: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <CSSReset />
      <Component {...pageProps} />
    </ThemeProvider>
  )
}
