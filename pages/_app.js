import { createGlobalStyle } from 'styled-components';
import theme from '../theme';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    scrollbar-width: thin;
    scrollbar-color: ${theme.colors.gray} transparent;
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

    a {
      color: ${theme.colors.lightAlternate};
    }
  }

  body.light {
    background-color: ${theme.colors.light};
    color: ${theme.colors.dark};

    a {
      color: ${theme.colors.darkAlternate};
    }
  }

  .hydration-target {
    display: contents;
  }

  .grecaptcha-badge {
    visibility: hidden;
  }

  @media (max-width: 768px) {
    .disable-scroll {
      overflow: hidden;
    }
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 10em;
    background-color: ${theme.colors.gray};
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
