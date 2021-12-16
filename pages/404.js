import styled from 'styled-components';
import withHydration from '../client/withHydration';
import Layout from '../components/Layout';
import NotFoundEffects from '../components/NotFoundEffects';
import { commonExtractor, notFoundPageExtractor } from '../extractors';
import theme from '../theme';

const HydratedNotFoundEffects = withHydration(
  NotFoundEffects,
  'NotFoundEffects'
);

// TODO: Change 404 path in caddyfile for arvind.io

const NotFound = ({ config, fontFaces, notFoundGifs }) => (
  <Layout config={config} fontFaces={fontFaces} seo={{ title: 'Not Found' }}>
    <NotFoundPage>
      <HydratedNotFoundEffects notFoundGifs={notFoundGifs} />
      <NotFoundText>
        <div>You&apos;ve landed on a page that doesn&apos;t exist.</div>
        <div>
          Write to{' '}
          <a
            href="mailto:mail@arvind.io"
            target="_blank"
            rel="noopener noreferrer"
          >
            mail@arvind.io
          </a>{' '}
          if you believe something went wrong.
        </div>
      </NotFoundText>
      <NotFoundCode>HTTP - 404</NotFoundCode>
    </NotFoundPage>
  </Layout>
);

const NotFoundPage = styled.div`
  text-align: center;
  padding: 1em 0;

  & .not-found-image {
    max-width: 100%;
  }

  & .glitch {
    font-size: 250px;
    position: relative;
    margin: 0 auto;
  }

  @keyframes noise-anim {
    0% {
      clip: rect(90px, 9999px, 170px, 0);
    }
    10% {
      clip: rect(189px, 9999px, 225px, 0);
    }
    20% {
      clip: rect(47px, 9999px, 88px, 0);
    }
    30% {
      clip: rect(2px, 9999px, 109px, 0);
    }
    40% {
      clip: rect(200px, 9999px, 217px, 0);
    }
    50% {
      clip: rect(171px, 9999px, 172px, 0);
    }
    60% {
      clip: rect(234px, 9999px, 95px, 0);
    }
    70% {
      clip: rect(94px, 9999px, 30px, 0);
    }
    80% {
      clip: rect(132px, 9999px, 166px, 0);
    }
    90% {
      clip: rect(119px, 9999px, 212px, 0);
    }
    to {
      clip: rect(140px, 9999px, 28px, 0);
    }
  }

  & .glitch-after {
    content: attr(data-text);
    position: absolute;
    width: 100%;
    left: 3px;
    text-shadow: -1px 0 red;
    top: 0;
    overflow: hidden;
    animation: noise-anim 2s infinite linear alternate-reverse;
  }

  @keyframes noise-anim-2 {
    0% {
      clip: rect(34px, 9999px, 157px, 0);
    }
    5% {
      clip: rect(166px, 9999px, 204px, 0);
    }
    10% {
      clip: rect(41px, 9999px, 196px, 0);
    }
    15% {
      clip: rect(143px, 9999px, 165px, 0);
    }
    20% {
      clip: rect(247px, 9999px, 134px, 0);
    }
    25% {
      clip: rect(44px, 9999px, 89px, 0);
    }
    30% {
      clip: rect(187px, 9999px, 76px, 0);
    }
    35% {
      clip: rect(49px, 9999px, 37px, 0);
    }
    40% {
      clip: rect(73px, 9999px, 7px, 0);
    }
    45% {
      clip: rect(123px, 9999px, 237px, 0);
    }
    50% {
      clip: rect(177px, 9999px, 5px, 0);
    }
    55% {
      clip: rect(116px, 9999px, 86px, 0);
    }
    60% {
      clip: rect(91px, 9999px, 106px, 0);
    }
    65% {
      clip: rect(167px, 9999px, 58px, 0);
    }
    70% {
      clip: rect(81px, 9999px, 200px, 0);
    }
    75% {
      clip: rect(144px, 9999px, 11px, 0);
    }
    80% {
      clip: rect(215px, 9999px, 167px, 0);
    }
    85% {
      clip: rect(107px, 9999px, 95px, 0);
    }
    90% {
      clip: rect(225px, 9999px, 107px, 0);
    }
    95% {
      clip: rect(208px, 9999px, 115px, 0);
    }
    to {
      clip: rect(133px, 9999px, 213px, 0);
    }
  }

  & .glitch-before {
    content: attr(data-text);
    position: absolute;
    width: 100%;
    left: -3px;
    text-shadow: 1px 0 blue;
    top: 0;
    overflow: hidden;
    animation: noise-anim-2 3s infinite linear alternate-reverse;
  }

  & .primary {
    color: ${theme.colors.primary};
  }

  .dark & .glitch,
  .dark & .glitch-after,
  .dark & .glitch-before {
    color: ${theme.colors.light};
    background-color: ${theme.colors.dark};
  }

  .light & .glitch,
  .light & .glitch-after,
  .light & .glitch-before {
    color: ${theme.colors.dark};
    background-color: ${theme.colors.light};
  }

  & .not-found-options {
    font-size: 0.8em;
    padding: 2em 0;
    display: flex;
    justify-content: center;
    gap: 2em;
  }

  & .not-found-options span {
    text-decoration: underline;
    cursor: pointer;
  }

  .dark & .not-found-options span {
    color: ${theme.colors.lightAlternate};
  }

  .light & .not-found-options span {
    color: ${theme.colors.darkAlternate};
  }

  & .hide {
    display: none;
  }

  @media (max-width: 768px) {
    & .glitch {
      font-size: 150px;
    }
  }
`;

const NotFoundText = styled.div`
  padding: 1em 0;
`;

const NotFoundCode = styled.div`
  font-size: 1.25em;
`;

export const getStaticProps = async () => {
  const { config, fontFaces } = await commonExtractor();
  const { notFoundGifs } = await notFoundPageExtractor();
  return {
    props: {
      config,
      fontFaces,
      notFoundGifs
    }
  };
};

export default NotFound;
