import { BiMoon } from 'react-icons/bi';
import { BsSun } from 'react-icons/bs';
import './toggle.style.css';
import { useEffect, useState } from 'react';

const Toggle = () => {
  const [theme, setTheme] = useState('light');

  const toggleThemeMode = () => {
    theme === 'dark' ? setTheme('light') : setTheme('dark');

    const html = document.querySelector('html');

    html.setAttribute('data-theme', theme);
    localStorage.setItem('selectedTheme', theme);
  };

  useEffect(() => {
    const selectedTheme = localStorage.getItem('selectedTheme');
    document.querySelector('html').setAttribute('data-theme', selectedTheme);
  }, [theme]);

  return (
    <div className='container'>
      <label className='toggle bg-theme' htmlFor='switch'>
        <input
          id='switch'
          className='input'
          type='checkbox'
          onClick={toggleThemeMode}
        />
        <div className='icon icon--moon'>
          <BiMoon />
        </div>

        <div className='icon icon--sun'>
          <BsSun />
        </div>
      </label>
    </div>
  );
};

export default Toggle;
