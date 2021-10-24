import { useEffect, useState } from 'preact/hooks';
import Bars from './icons/Bars';
import Cross from './icons/Cross';

const MenuButton = () => {
  const [hydrated, setHydrated] = useState(false);
  const [display, setDisplay] = useState(false);
  useEffect(() => {
    setHydrated(true);
  }, []);

  if (hydrated) {
    if (display) {
      return (
        <Cross
          className="menu-icon"
          onClick={() => {
            document.documentElement.classList.remove('disable-scroll');
            document.getElementById('sidebar').classList.remove('visible');
            setDisplay(false);
          }}
        />
      );
    } else {
      return (
        <Bars
          className="menu-icon"
          onClick={() => {
            document.documentElement.classList.add('disable-scroll');
            document.getElementById('sidebar').classList.add('visible');
            setDisplay(true);
          }}
        />
      );
    }
  } else {
    return (
      <a href="/menu">
        <Bars className="menu-icon" />
      </a>
    );
  }
};

export default MenuButton;
