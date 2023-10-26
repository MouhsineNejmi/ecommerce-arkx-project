import { any } from 'prop-types';
import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { DarkModeContext } from '../context/DarkModeContext';

import MenuIcon from './menu-icon.component';
import { RiLogoutCircleRLine } from 'react-icons/ri';
import { HiPlus } from 'react-icons/hi';

import LightAfricomLogo from '../assets/light-africom.svg';
import DarkAfricomLogo from '../assets/dark-africom.svg';

import sidebarData from '../data/sidebar.data';
import SidebarItem from '../components/sidebar-item.component';

const Sidebar = () => {
  const { darkMode } = useContext(DarkModeContext);
  const [expanded, setExpanded] = useState(true);

  const toggleExpand = () => setExpanded((prev) => !prev);

  return (
    <aside
      className={`h-screen ${
        expanded ? 'w-2/12' : 'w-20'
      } dark:bg-black dark:text-white`}
    >
      <nav className='h-full flex flex-col border-r shadow-sm'>
        <div
          className={`flex items-center h-[100px] ${
            !expanded && 'p-0 w-full justify-center'
          } ${expanded && 'justify-between p-4 pl-0 pb-2'}`}
        >
          <img
            src={darkMode ? DarkAfricomLogo : LightAfricomLogo}
            alt='Africom Logo'
            className={`overflow-hidden transition-all ${
              expanded ? 'w-32' : 'w-0'
            }`}
          />
          <button
            className='p-1.5 rounded-lg bg-accent-1 transition-all text-black hover:bg-accent-2 text-white'
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

          <ul className='border-t mt-4'>
            {expanded && (
              <h4 className='text-gray-1 text-[11px] font-medium mt-4 mb-2'>
                Quick actions
              </h4>
            )}
            <li className='p-3 relative group'>
              <Link
                className={`w-full flex pb-6 items-center hover:underline ${
                  !expanded && 'justify-center mt-6'
                }`}
              >
                <div className='w-4 h-4 bg-gray-1 rounded-full flex items-center justify-center bg-gray-2'>
                  <HiPlus size={18} className='text-gray-1' />
                </div>
                {expanded && (
                  <h3 className='ml-2 text-[12px] tracking-tight font-semibold'>
                    Add member
                  </h3>
                )}
                {!expanded && (
                  <div
                    className={`absolute left-full rounded-md px-2 py-1 ml-6 bg-accent-2 text-white text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:-translate-x-0`}
                  >
                    Add member
                  </div>
                )}
              </Link>
            </li>
          </ul>
        </ul>

        <Link
          className={`relative group flex pb-6 justify-center items-center hover:underline ${
            expanded && 'w-[90%]'
          }`}
        >
          <RiLogoutCircleRLine size={18} />
          {expanded && <h3 className='ml-2 text-base'>Logout</h3>}
          {!expanded && (
            <div
              className={`absolute left-full rounded-md px-2 py-1 ml-6 bg-accent-2 text-white text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:-translate-x-0`}
            >
              Logout
            </div>
          )}
        </Link>
      </nav>
    </aside>
  );
};

Sidebar.propTypes = {
  children: any,
};

export default Sidebar;
