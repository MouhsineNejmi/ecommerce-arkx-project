import { createContext, useEffect, useState } from 'react';
import { any } from 'prop-types';

export const DarkModeContext = createContext();
export const DarkModeProvider = ({ children }) => {
  const initialDarkMode = JSON.parse(localStorage.getItem('darkMode')) || false;
  const [darkMode, setDarkMode] = useState(initialDarkMode);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(!darkMode);

    localStorage.setItem('darkMode', JSON.stringify(newDarkMode));
  };

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  return (
    <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};

DarkModeProvider.propTypes = {
  children: any,
};
