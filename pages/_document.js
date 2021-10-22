import Document, { Head, Html, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

/*
 * There is no good reason to edit this file.
 *
 * This file is a near identical copy of the code provided by next.js
 * https://github.com/vercel/next.js/blob/master/examples/with-styled-components/pages/_document.js
 *
 * I know it is tempting. Putting some content here is probably the easiest way to solve your problem,
 * but trust me, you won't be the first person to shoot yourself in the foot because you didn't take a
 * few extra minutes to think this problem through.
 *
 * If you want to inject resources for SSR, edit CriticalResources.js instead.
 */

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />)
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        )
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html>
        <Head />
        <body className="dark">
          <Main />
          {process.env.NODE_ENV === 'development' ? <NextScript /> : null}
        </body>
      </Html>
    );
  }
}
