import type {AppProps} from 'next/app'

export default function Strapless({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

