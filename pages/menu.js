import styled from 'styled-components';
import { StyledLink } from '../components/BlogPostComponents';
import GitHub from '../components/icons/GitHub';
import Keybase from '../components/icons/Keybase';
import Logo from '../components/icons/Logo';
import Twitch from '../components/icons/Twitch';
import Twitter from '../components/icons/Twitter';
import Layout from '../components/Layout';
import { commonExtractor } from '../extractors';
import theme from '../theme';

const Menu = ({ config, fontFaces }) => (
  <Layout config={config} fontFaces={fontFaces} seo={{ title: 'Site map' }}>
    <MenuPage>
      <StyledLogo />
      <StyledInfo>
        Hi, I&apos;m Arvind Kumar.
        <br />
        I am a software developer, a musician and an amateur astronomer.
        <br />
        If you&apos;d like to get in touch,
        <br />
        <StyledLink href="mailto:mail@arvind.io">send me an email</StyledLink>.
      </StyledInfo>
      <SocialLinks>
        <a
          href="https://twitter.com/TheEnKrypt"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Twitter />
        </a>
        <a
          href="https://github.com/EnKrypt"
          target="_blank"
          rel="noopener noreferrer"
        >
          <GitHub />
        </a>
        <a
          href="https://www.twitch.tv/enkryptontwitch"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Twitch />
        </a>
        <a
          href="https://keybase.io/enkrypt"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Keybase />
        </a>
      </SocialLinks>
      <MenuItem className="alt">
        <StyledLink underline={false} href="/">
          Home
        </StyledLink>
      </MenuItem>
      <MenuItem>
        <StyledGreenLink underline={false} href="/hire">
          Hire me
        </StyledGreenLink>
      </MenuItem>
      <MenuItem className="alt">
        <StyledLink
          target="_blank"
          rel="noopener noreferrer"
          underline={false}
          href="/resume.pdf"
        >
          Resume
        </StyledLink>
      </MenuItem>
      <MenuItem>
        <StyledLink
          target="_blank"
          rel="noopener noreferrer"
          underline={false}
          href="/rss.xml"
        >
          RSS Feed
        </StyledLink>
      </MenuItem>
      <MenuItem className="alt">
        <StyledLink
          target="_blank"
          rel="noopener noreferrer"
          underline={false}
          href="https://github.com/EnKrypt/arvind.io"
        >
          Source
        </StyledLink>
      </MenuItem>
      <DonateButton
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.buymeacoffee.com/EnKrypt"
      >
        <img src="/images/donate.png" alt="Buy me a beer" />
      </DonateButton>
    </MenuPage>
  </Layout>
);

const MenuPage = styled.div`
  font-size: 1.35em;
  text-align: center;
  padding-top: 1em;
`;

const StyledLogo = styled(Logo)`
  width: 7.5em;
  height: 9em;
  margin: 0 auto;

  &:hover {
    background-image: url(/images/dp.jpg);
    background-size: cover;

    & g {
      visibility: hidden;
    }
  }
`;

const StyledInfo = styled.div`
  padding: 2em 0;
`;

const SocialLinks = styled.div`
  display: flex;
  justify-content: space-evenly;
  padding-bottom: 2em;

  & svg {
    height: 1.5em;
  }
`;

const MenuItem = styled.div`
  padding: 0.25em;
  font-size: 1.1em;

  .dark &.alt {
    background-color: ${theme.colors.darkgray};
  }

  .light &.alt {
    background-color: ${theme.colors.lightgray};
  }

  .dark &:hover {
    background-color: ${theme.colors.darkest};
  }

  .light &:hover {
    background-color: ${theme.colors.lightest};
  }
`;

const StyledGreenLink = styled(StyledLink)`
  && {
    color: ${theme.colors.green};
  }
`;

const DonateButton = styled.a`
  display: block;
  margin-top: 2em;
`;

export const getStaticProps = async (context) => {
  const { config, fontFaces } = await commonExtractor();
  return {
    props: {
      config,
      fontFaces
    }
  };
};

export default Menu;
