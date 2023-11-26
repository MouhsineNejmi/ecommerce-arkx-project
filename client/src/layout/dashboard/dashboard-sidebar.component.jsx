/* eslint-disable react/prop-types */
import { Link, NavLink } from 'react-router-dom';

import sidebarData from '../../data/sidebar.data';

import { ChevronRight } from 'lucide-react';

const DashboardSidebar = ({ expanded, toggleExpand }) => {
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
          {expanded && (
            <Link to='/admin/dashboard'>
              <h2 className='font-bold w-[100px] font-bold text-md'>
                Desing <span className='text-gold text-md'>Elegance</span>
              </h2>
            </Link>
          )}
          <button
            className='p-1.5 rounded-lg bg-gold transition-all hover:bg-light-gold text-white'
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
                          isActive ? 'bg-gold text-white' : 'text-variant-black'
                        } ${
                      expanded ? 'w-full' : ''
                    } hover:bg-light-gold hover:text-white`
                  }
                >
                  <div className='flex'>
                    {menu.icon}
                    {expanded && <h3 className='ml-3 text-xs'>{menu.name}</h3>}
                  </div>
                </NavLink>

                {!expanded && (
                  <div
                    className={`absolute z-10 left-full rounded-md px-2 py-1 ml-6 z-20 bg-gold text-white text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:-translate-x-0`}
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

export default DashboardSidebar;
