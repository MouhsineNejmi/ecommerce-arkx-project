/* eslint-disable react/prop-types */
import { useTheme } from '@/context/ThemeProvider';

import LightAfricomLogo from '../../assets/logo/light-africom.svg';
import DarkAfricomLogo from '../../assets/logo/dark-africom.svg';

const AfricomLogo = ({ expanded }) => {
  const { theme } = useTheme();

  return (
    <div
      className={`overflow-hidden transition-all ${expanded ? 'w-20' : 'w-0'}`}
    >
      {theme === 'light' ? (
        <img src={LightAfricomLogo} alt={'Africom Dark Logo'} />
      ) : (
        <img src={DarkAfricomLogo} alt={'Africom Dark Logo'} />
      )}
    </div>
  );
};

export default AfricomLogo;
