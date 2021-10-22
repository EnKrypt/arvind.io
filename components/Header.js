import styled from 'styled-components';
import withHydration from '../client/withHydration';
import theme from '../theme';
import Menu from './Menu';
import ThemeChanger from './ThemeChanger';

const HydratedThemeChanger = withHydration(ThemeChanger, 'ThemeChanger');
const HydratedMenu = withHydration(Menu, 'Menu');

const Header = () => (
  <StyledHeader>
    <LeftAlign>
      <HydratedMenu />
    </LeftAlign>
    <a href="/">
      <FirstName>arvind </FirstName>
      <span>kumar</span>
    </a>
    <RightAlign>
      <HydratedThemeChanger />
    </RightAlign>
  </StyledHeader>
);

const StyledHeader = styled.div`
  position: fixed;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 1.73em;
  width: 100%;
  font-size: 2em;
  padding: 0 1.25em;
  background-size: cover;
  background-repeat: no-repeat;
  z-index: 2;

  .dark & {
    background-image: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),
      url(/images/navbar-dark.jpg);
    box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.5);
  }

  .light & {
    background-image: linear-gradient(
        rgba(255, 255, 255, 0.56),
        rgba(255, 255, 255, 0.56)
      ),
      url(/images/navbar-light.jpg);
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.5);
  }

  @media (max-width: 768px) {
    font-size: 1.5em;
    padding: 0 0.8em;

    & .switch {
      transform: scale(0.85);
    }
  }

  & .menu-icon {
    cursor: pointer;
    color: ${theme.colors.primary};

    &:hover {
      color: ${theme.colors.accent};
    }
  }

  // Styles related to theme changer
  & .switch {
    position: relative;
    width: 60px;
    height: 34px;
  }

  & .switch input {
    display: none;
  }

  & .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 34px;
    background-color: ${theme.colors.invertedAccent};
  }

  & .slider:before {
    position: absolute;
    content: '';
    height: 23px;
    width: 23px;
    left: 6px;
    bottom: 6px;
    border-radius: 50%;
    background-color: #ffff00;
    box-shadow: 0px 0px 5px 4px rgb(255, 217, 0);
    transition: 0.25s;
  }

  .dark & .slider {
    background-color: ${theme.colors.accent};
  }

  .dark & .slider:before {
    background-color: ${theme.colors.accent};
    height: 30px;
    width: 30px;
    bottom: 2px;
    transform: translateX(22px);
    box-shadow: inset -8px -5px 1px 1px ${theme.colors.lightest};
  }
`;

const LeftAlign = styled.div`
  display: flex;
  flex: 1;
`;

const RightAlign = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-end;
`;

const FirstName = styled.span`
  color: ${theme.colors.primary};
`;

export default Header;
