/* eslint-disable react/prop-types */
import { Link, NavLink } from 'react-router-dom';

import sidebarData from '../data/sidebar.data';

import AfricomLogo from '../components/icons/africom-logo.component';

import { ChevronRight } from 'lucide-react';

const Sidebar = ({ expanded, toggleExpand }) => {
  return (
    <aside
      className={`fixed left-0 bg-white h-screen ${expanded ? 'w-52' : 'w-20'}`}
    >
      <nav className='h-full w-full flex flex-col border-r border-slate-300 shadow-sm'>
        <div
          className={`flex items-center h-[80px] ${
            !expanded ? 'w-full justify-center' : ''
          } ${expanded ? 'justify-between p-4' : ''}`}
        >
          <Link to='/admin/dashboard'>
            <AfricomLogo expanded={expanded} />
          </Link>
          <button
            className='p-1.5 rounded-lg bg-main-1 transition-all hover:bg-main-2 text-white'
            onClick={toggleExpand}
          >
            <ChevronRight
              className={`${expanded ? 'rotate-180' : 'rotate-0'}`}
            />
          </button>
        </div>

        <ul className='flex-1 px-3 flex flex-col gap-2'>
          {sidebarData?.map((menu, i) => {
            return (
              <li
                key={i}
                className={`relative group flex flex-col items-center ${
                  !expanded ? 'justify-center' : ''
                }`}
              >
                <NavLink
                  to={menu.link}
                  className={({ isActive }) =>
                    `flex items-center justify-between font-medium transition p-3 rounded-2xl
                        ${
                          isActive
                            ? 'bg-main-1 text-white'
                            : 'text-variant-black'
                        } ${
                      expanded ? 'w-full' : ''
                    } hover:bg-main-2 hover:text-white`
                  }
                >
                  <div className='flex'>
                    {menu.icon}
                    {expanded && <h3 className='ml-3 text-xs'>{menu.name}</h3>}
                  </div>
                </NavLink>

                {!expanded && (
                  <div
                    className={`absolute z-10 left-full rounded-md px-2 py-1 ml-6 bg-main-2 text-white text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:-translate-x-0`}
                  >
                    {menu.name}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
