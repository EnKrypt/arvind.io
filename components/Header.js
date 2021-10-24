import styled from 'styled-components';
import withHydration from '../client/withHydration';
import theme from '../theme';
import MenuContent from './MenuContent';
import MenuButton from './MenuButton';
import ThemeChanger from './ThemeChanger';

const HydratedThemeChanger = withHydration(ThemeChanger, 'ThemeChanger');
const HydratedMenuButton = withHydration(MenuButton, 'MenuButton');

const Header = () => (
  <>
    <Sidebar id="sidebar">
      <MenuContent />
    </Sidebar>
    <StyledHeader>
      <LeftAlign>
        <HydratedMenuButton />
      </LeftAlign>
      <a href="/">
        <FirstName>arvind </FirstName>
        <span>kumar</span>
      </a>
      <RightAlign>
        <HydratedThemeChanger />
      </RightAlign>
    </StyledHeader>
  </>
);

const Sidebar = styled.div`
  padding: 3em 0;
  width: 18em;
  height: calc(100% - 3.5em);
  text-align: center;
  position: fixed;
  bottom: 0;
  left: -18em;
  overflow-y: auto;
  transition: 0.25s ease;
  z-index: 1;

  .dark & {
    box-shadow: 5px 5px 10px 0 rgba(0, 0, 0, 0.5);
  }

  .light & {
    box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.5);
  }

  &.visible {
    left: 0;
  }
`;

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
    background: linear-gradient(
          135deg,
          ${theme.colors.darkerAccent} 25%,
          transparent 25%
        ) -18px 0,
      linear-gradient(225deg, ${theme.colors.darkerAccent} 25%, transparent 25%) -18px
        0,
      linear-gradient(315deg, ${theme.colors.darkerAccent} 25%, transparent 25%),
      linear-gradient(45deg, ${theme.colors.darkerAccent} 25%, transparent 25%);
    background-size: 36px 36px;
    background-color: ${theme.colors.darkest};
    box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.5);
  }

  .light & {
    background: linear-gradient(
          135deg,
          ${theme.colors.lighterAccent} 25%,
          transparent 25%
        ) -18px 0,
      linear-gradient(
          225deg,
          ${theme.colors.lighterAccent} 25%,
          transparent 25%
        ) -18px 0,
      linear-gradient(
        315deg,
        ${theme.colors.lighterAccent} 25%,
        transparent 25%
      ),
      linear-gradient(45deg, ${theme.colors.lighterAccent} 25%, transparent 25%);
    background-size: 36px 36px;
    background-color: ${theme.colors.lightest};
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
      color: ${theme.colors.darkAccent};
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
    background-color: ${theme.colors.lightAccent};
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
    background-color: ${theme.colors.darkAccent};
  }

  .dark & .slider:before {
    background-color: ${theme.colors.darkAccent};
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
