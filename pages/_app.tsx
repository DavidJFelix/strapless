import type {AppProps} from 'next/app'
import {ChakraProvider, extendTheme} from '@chakra-ui/react'

const appTheme = extendTheme({
  fonts: {
    body: `-apple-system, system-ui, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue' Ubuntu, Arial, sans-serif`,
  },
})

export default function Strapless({Component, pageProps}: AppProps) {
  return (
    <ChakraProvider theme={appTheme}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}
