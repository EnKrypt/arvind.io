import Head from 'next/head';
import styled from 'styled-components';
import Header from './Header';

const Layout = ({ config, fontFaces, seo = {}, children }) => (
  <main>
    <Head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="format-detection" content="telephone=no" />
      <meta
        name="title"
        content={`${seo.title || config.AUTHOR} | ${config.TITLE}`}
      />
      <meta
        name="description"
        content={seo.description || config.DESCRIPTION}
      />
      <meta name="referrer" content="origin" />
      <meta
        property="og:title"
        content={`${seo.title || config.AUTHOR} | ${config.TITLE}`}
      />
      <meta property="og:image" content={seo.image || '/images/preview.png'} />
      <meta
        property="og:description"
        content={seo.description || config.DESCRIPTION}
      />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content="@TheEnKrypt" />
      <meta
        name="twitter:title"
        content={`${seo.title || config.AUTHOR} | ${config.TITLE}`}
      />
      <meta
        name="twitter:description"
        content={seo.description || config.DESCRIPTION}
      />
      <meta
        name="twitter:image"
        content={`${config.URL}${seo.image || '/images/preview.png'}`}
      />
      <meta
        itemProp="name"
        content={`${seo.title || config.AUTHOR} | ${config.TITLE}`}
      />
      <meta
        itemProp="description"
        content={seo.description || config.DESCRIPTION}
      />
      <meta itemProp="image" content={seo.image || '/images/preview.png'} />
      <title>{`${seo.title || config.AUTHOR} | ${config.TITLE}`}</title>

      <meta name="msapplication-config" content="/manifest/browserconfig.xml" />
      <meta name="theme-color" content="#0094ff" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/manifest/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        href="/manifest/favicon-32x32.png"
        sizes="32x32"
      />
      <link
        rel="icon"
        type="image/png"
        href="/manifest/favicon-16x16.png"
        sizes="16x16"
      />
      <link
        rel="mask-icon"
        href="/manifest/safari-pinned-tab.svg"
        color="#0094ff"
      />
      <link rel="shortcut icon" href="/manifest/favicon.ico" />
      <link rel="manifest" href="/manifest/manifest.json" />

      <style
        dangerouslySetInnerHTML={{
          __html: fontFaces
        }}
      />
    </Head>
    <script
      dangerouslySetInnerHTML={{
        __html: `
          const storedState = JSON.parse(localStorage.getItem('state'));
          if (storedState && storedState.hasOwnProperty('theme')) {
            document.body.className = storedState.theme;
          }
          window.lazyLoadOptions = {};
        `.concat(
          process.env.ANALYTICS === 'true'
            ? `
          (function(f, a, t, h, o, m){
            a[h]=a[h]||function(){
              (a[h].q=a[h].q||[]).push(arguments)
            };
            o=f.createElement('script'),
            m=f.getElementsByTagName('script')[0];
            o.async=1; o.src=t; o.id='fathom-script';
            m.parentNode.insertBefore(o,m)
          })(document, window, '//fathom.arvind.io/tracker.js', 'fathom');
          fathom('set', 'siteId', '${config.FATHOMSITEID}');
          fathom('trackPageview');
        `
            : ''
        )
      }}
      defer
    ></script>
    <script
      src="https://cdn.jsdelivr.net/npm/vanilla-lazyload@17.5.0/dist/lazyload.min.js"
      defer
    ></script>
    <Header />
    <Page>{children}</Page>
  </main>
);

const Page = styled.div`
  padding: 5.5em 2.5em 2.5em 2.5em;
  max-width: 55em;
  margin: 0 auto;

  @media (max-width: 768px) {
    width: 100%;
    padding: 4.5em 2.5em 2.5em 2.5em;
    font-size: 0.8em;
  }
`;

export default Layout;
