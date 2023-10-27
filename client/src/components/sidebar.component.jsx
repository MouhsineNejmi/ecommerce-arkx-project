import { any } from 'prop-types';
import { useState } from 'react';
import { useTheme } from '@/context/ThemeProvider';

import MenuIcon from './menu-icon.component';

import LightAfricomLogo from '../assets/light-africom.svg';
import DarkAfricomLogo from '../assets/dark-africom.svg';

import sidebarData from '../data/sidebar.data';
import SidebarItem from '../components/sidebar-item.component';

const Sidebar = () => {
  const { theme } = useTheme();
  const [expanded, setExpanded] = useState(true);

  const toggleExpand = () => setExpanded((prev) => !prev);

  return (
    <aside className={`h-screen ${expanded ? 'w-2/12' : 'w-20'}`}>
      <nav className='h-full flex flex-col border-r shadow-sm'>
        <div
          className={`flex items-center h-[80px] ${
            !expanded ? 'w-full justify-center' : ''
          } ${expanded ? 'justify-between p-4' : ''}`}
        >
          <img
            src={theme === 'dark' ? DarkAfricomLogo : LightAfricomLogo}
            alt='Africom Logo'
            className={`overflow-hidden transition-all ${
              expanded ? 'w-20' : 'w-0'
            }`}
          />
          <button
            className='p-1.5 rounded-lg bg-main-1 transition-all hover:bg-main-2 text-white'
            onClick={toggleExpand}
          >
            <MenuIcon expanded={expanded} />
          </button>
        </div>

        <ul className='flex-1 px-3'>
          {sidebarData.map(({ name, icon, link }, idx) => (
            <SidebarItem
              key={idx}
              name={name}
              icon={icon}
              link={link}
              expanded={expanded}
            />
          ))}
        </ul>
      </nav>
    </aside>
  );
};

Sidebar.propTypes = {
  children: any,
};

export default Sidebar;
