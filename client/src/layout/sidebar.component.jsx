import { useState } from 'react';
import { NavLink } from 'react-router-dom';

import sidebarData from '../data/sidebar.data';

import AfricomLogo from '../components/icons/africom-logo.component';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../components/ui/accordion';
import { ChevronRight } from 'lucide-react';

const Sidebar = () => {
  const [expanded, setExpanded] = useState(true);

  const toggleExpand = () => setExpanded((prev) => !prev);

  return (
    <aside className={`h-screen ${expanded ? 'w-2/12' : 'w-20'}`}>
      <nav className='h-full flex flex-col border-r border-slate-300 shadow-sm'>
        <div
          className={`flex items-center h-[80px] ${
            !expanded ? 'w-full justify-center' : ''
          } ${expanded ? 'justify-between p-4' : ''}`}
        >
          <AfricomLogo expanded={expanded} />
          <button
            className='p-1.5 rounded-lg bg-main-1 transition-all hover:bg-main-2 text-white'
            onClick={toggleExpand}
          >
            <ChevronRight
              className={`${expanded ? 'rotate-180' : 'rotate-0'}`}
            />
          </button>
        </div>

        <ul className='flex-1 px-3'>
          <div className='space-y-1'>
            {sidebarData?.map((menu, i) => {
              if (menu.isParent) {
                return (
                  <Accordion
                    key={`${menu}-${i}`}
                    type='single'
                    collapsible
                    className='w-full'
                  >
                    <AccordionItem value={`item-${i}`} className='border-b-0'>
                      <AccordionTrigger
                        className={`flex items-center justify-between font-medium transition p-3 text-variant-black ${
                          menu.isParent
                            ? 'aria-expanded:rounded-t-2xl aria-expanded:bg-main-1 aria-expanded:text-white'
                            : 'rounded-2xl'
                        }  ${
                          expanded ? 'w-full' : ''
                        } hover:bg-main-2 hover:text-white`}
                      >
                        <div className='flex'>
                          {menu.icon}
                          {expanded && (
                            <h3 className='ml-3 text-[11px]'>{menu.name}</h3>
                          )}
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className='w-full pb-2 pl-2 pr-2 rounded-b-2xl bg-main-1'>
                        {menu.sub_menu?.map((subItem, subIndex) => (
                          <li key={subIndex} className='py-1'>
                            <NavLink
                              to={subItem.link}
                              className={({ isActive }) =>
                                `flex items-center font-medium text-white transition p-3 rounded-2xl ${
                                  isActive ? 'bg-accent' : 'text-variant-black'
                                } ${
                                  expanded ? 'w-full' : ''
                                } hover:bg-accent-foreground hover:text-black`
                              }
                            >
                              {subItem.icon}
                              {expanded && (
                                <h3 className='ml-3 text-[11px]'>
                                  {subItem.name}
                                </h3>
                              )}
                            </NavLink>
                          </li>
                        ))}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                );
              } else {
                return (
                  <li
                    key={i}
                    className={`relative group mb-2 flex flex-col items-center ${
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
                        {expanded && (
                          <h3 className='ml-3 text-[11px]'>{menu.name}</h3>
                        )}
                      </div>
                    </NavLink>

                    {!expanded && (
                      <div
                        className={`absolute left-full rounded-md px-2 py-1 ml-6 bg-main-2 text-white text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:-translate-x-0`}
                      >
                        {menu.name}
                      </div>
                    )}
                  </li>
                );
              }
            })}
          </div>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
