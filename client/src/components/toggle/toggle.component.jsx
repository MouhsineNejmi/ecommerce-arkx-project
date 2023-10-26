import { BiMoon } from 'react-icons/bi';
import { BsSun } from 'react-icons/bs';
import './toggle.style.css';
import { useDarkMode } from '../../hooks/useDarkMode';

const Toggle = () => {
  const { darkMode, toggleDarkMode } = useDarkMode();

  return (
    <div className='container'>
      <label className='toggle bg-theme' htmlFor='switch'>
        <input
          id='switch'
          className='input'
          type='checkbox'
          onClick={toggleDarkMode}
        />
        <div className='icon'>
          {darkMode ? <BsSun /> : <BiMoon fill='#000' />}
        </div>
      </label>
    </div>
  );
};

export default Toggle;
