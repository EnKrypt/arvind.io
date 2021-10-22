import { useEffect, useState } from 'preact/hooks';

const ThemeChanger = () => {
  const toggleTheme = (newTheme) => {
    setTheme(newTheme);
    document.body.className = newTheme;
    localStorage.setItem('state', JSON.stringify({ theme: newTheme }));
  };

  const [theme, setTheme] = useState('');
  useEffect(() => {
    try {
      const storedState = JSON.parse(localStorage.getItem('state'));
      if (storedState && storedState.hasOwnProperty('theme')) {
        setTheme(storedState.theme);
        document.body.className = storedState.theme;
      } else {
        setTheme('dark');
        localStorage.setItem('state', JSON.stringify({ theme: 'dark' }));
      }
    } catch (error) {
      setTheme('dark');
      if (error instanceof SyntaxError) {
        console.warn(
          'Values in localStorage is not valid JSON. Clearing for next use, using defaults for now'
        );
        localStorage.removeItem('state');
      }
    }
  }, []);

  if (theme) {
    return (
      <label id="switch" className="switch">
        <input
          type="checkbox"
          onChange={() => {
            if (theme === 'dark') {
              toggleTheme('light');
            } else {
              toggleTheme('dark');
            }
          }}
        />
        <span className="slider"></span>
      </label>
    );
  } else {
    return <span></span>;
  }
};

export default ThemeChanger;
