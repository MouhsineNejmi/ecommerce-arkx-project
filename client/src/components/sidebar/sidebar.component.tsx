import { useState } from 'react';

import MenuIcon from '@/components/menu-icon.component';

import sidebarData from '@/data/sidebar.data';
import SidebarItem from './sidebar-item.component';
import AfricomLogo from '../icons/africom-logo.component';

const Sidebar = (): React.ReactElement => {
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

export default Sidebar;
