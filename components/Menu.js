import { useEffect, useState } from 'preact/hooks';
import Bars from './icons/Bars';
import Cross from './icons/Cross';

const Menu = () => {
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
            setDisplay(false);
          }}
        />
      );
    } else {
      return (
        <Bars
          className="menu-icon"
          onClick={() => {
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

export default Menu;
