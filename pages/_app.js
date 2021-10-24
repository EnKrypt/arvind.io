import { createGlobalStyle } from 'styled-components';
import theme from '../theme';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  html,
  body {
    padding: 0;
    margin: 0;
    height: 100%;
    overscroll-behavior: contain;
    font-family: '${theme.fonts.primary}';
  }

  body.dark {
    background-color: ${theme.colors.dark};
    color: ${theme.colors.light};
  }

  body.light {
    background-color: ${theme.colors.light};
    color: ${theme.colors.dark};
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  .hydration-target {
    display: contents;
  }

  @media (max-width: 768px) {
    .disable-scroll {
      overflow: hidden;
    }
  }

  ::-webkit-scrollbar-track,
  ::-webkit-scrollbar-thumb {
    border-radius: 10em;
  }

  ::-webkit-scrollbar {
    width: 5px;
    height: 5px;
  }

  .dark ::-webkit-scrollbar-thumb {
    background-color: ${theme.colors.lightgray};
  }

  .light ::-webkit-scrollbar-thumb {
    background-color: ${theme.colors.darkgray};
  }
`;

const MyApp = ({ Component, pageProps }) => (
  <>
    <GlobalStyle />
    <Component {...pageProps} />
  </>
);

export default MyApp;
