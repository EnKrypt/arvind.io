import { createGlobalStyle } from 'styled-components';
import theme from '../theme';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    scrollbar-width: thin;
    scrollbar-color: var(--scrollbar-color);
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
    --scrollbar-color: ${theme.colors.lightgray};
  }

  body.light {
    background-color: ${theme.colors.light};
    color: ${theme.colors.dark};
    --scrollbar-color: ${theme.colors.darkgray};
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

  ::-webkit-scrollbar-thumb {
    border-radius: 10em;
    background-color: var(--scrollbar-color);
  }

  ::-webkit-scrollbar {
    width: 5px;
  }
`;

const MyApp = ({ Component, pageProps }) => (
  <>
    <GlobalStyle />
    <Component {...pageProps} />
  </>
);

export default MyApp;
