import styled from 'styled-components';
import donateImage from '../public/images/donate.png?resize';
import authorImage from '../public/images/dp.jpg?resize';
import theme from '../theme';
import GitHub from './icons/GitHub';
import Keybase from './icons/Keybase';
import Logo from './icons/Logo';
import Twitch from './icons/Twitch';
import Twitter from './icons/Twitter';

const MenuContent = ({ sidebar }) => (
  <>
    <LogoAndPicture>
      <StyledLogo />
      <AuthorImage
        alt="Arvind Kumar"
        className="lazy"
        src={authorImage.placeholder || authorImage.src}
        data-srcset={authorImage.srcSet}
        data-sizes={sidebar ? '120px' : '162px'}
      />
    </LogoAndPicture>
    <StyledInfo>
      Hi, I&apos;m Arvind Kumar.
      <br />
      I am a software developer, a musician and an amateur astronomer.
      <br />
      If you&apos;d like to get in touch,
      <br />
      <a
        href="mailto:mail@arvind.io"
        target="_blank"
        rel="nofollow noopener noreferrer"
      >
        send me an email
      </a>
      .
    </StyledInfo>
    <SocialLinks>
      <a
        href="https://twitter.com/TheEnKrypt"
        target="_blank"
        rel="nofollow noopener noreferrer"
      >
        <Twitter />
      </a>
      <a
        href="https://github.com/EnKrypt"
        target="_blank"
        rel="nofollow noopener noreferrer"
      >
        <GitHub />
      </a>
      <a
        href="https://www.twitch.tv/enkryptontwitch"
        target="_blank"
        rel="nofollow noopener noreferrer"
      >
        <Twitch />
      </a>
      <a
        href="https://keybase.io/enkrypt"
        target="_blank"
        rel="nofollow noopener noreferrer"
      >
        <Keybase />
      </a>
    </SocialLinks>
    <MenuItem className="alt">
      <a href="/">Home</a>
    </MenuItem>
    <MenuItem>
      <StyledGreenLink href="/hire">Hire me</StyledGreenLink>
    </MenuItem>
    <MenuItem className="alt">
      <a target="_blank" rel="nofollow noopener noreferrer" href="/resume.pdf">
        Resume
      </a>
    </MenuItem>
    <MenuItem>
      <a target="_blank" rel="nofollow noopener noreferrer" href="/atom.xml">
        Atom
      </a>
      {' | '}
      <a target="_blank" rel="nofollow noopener noreferrer" href="/rss.xml">
        RSS
      </a>
    </MenuItem>
    <MenuItem className="alt">
      <a
        target="_blank"
        rel="nofollow noopener noreferrer"
        href="https://github.com/EnKrypt/arvind.io"
      >
        Source
      </a>
    </MenuItem>
    <MenuItem>
      <a href="/legal">Legal</a>
    </MenuItem>
    <DonateButton
      sidebar={sidebar}
      target="_blank"
      rel="nofollow noopener noreferrer"
      href="https://www.buymeacoffee.com/EnKrypt"
    >
      <img
        alt="Buy me a beer"
        className="lazy"
        src={donateImage.placeholder || donateImage.src}
        data-srcset={donateImage.srcSet}
        data-sizes="240px"
      />
    </DonateButton>
  </>
);

const LogoAndPicture = styled.div`
  width: 7.5em;
  height: 7.5em;
  position: relative;
  margin: 0.75em auto;
`;

const StyledLogo = styled(Logo)`
  opacity: 1;
  transition: 0.2s;

  .dark & {
    background-color: ${theme.colors.dark};
  }

  .light & {
    background-color: ${theme.colors.light};
  }

  &:hover {
    opacity: 0;
  }
`;

const AuthorImage = styled.img`
  position: absolute;
  left: 0;
  width: 100%;
  border-radius: 10em;
  z-index: -1;
`;

const StyledInfo = styled.div`
  padding: 2em 1em;
`;

const SocialLinks = styled.div`
  display: flex;
  justify-content: space-evenly;
  padding-bottom: 2em;

  && a {
    color: inherit;
  }

  & svg {
    height: 1.5em;
  }
`;

const MenuItem = styled.div`
  padding: 0.25em;
  font-size: 1.1em;

  & a {
    text-decoration: none;
  }

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

const StyledGreenLink = styled.a`
  && {
    color: ${theme.colors.green};
  }
`;

const DonateButton = styled.a`
  display: block;
  margin-top: 2em;

  & img {
    width: 240px;
    height: 64.5px;
  }
`;

export default MenuContent;
