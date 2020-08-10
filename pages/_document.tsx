import Document, {Head, Main, NextScript, Html} from 'next/document'

export default class StraplessDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
