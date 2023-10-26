import { string, any, bool } from 'prop-types';
import { NavLink } from 'react-router-dom';

const SidebarItem = ({ name, icon, link, expanded }) => {
  return (
    <li
      className={`relative group mb-2 flex items-center ${
        !expanded && 'justify-center'
      }`}
    >
      <NavLink
        to={link}
        className={({ isActive }) =>
          `flex items-center text-sm font-medium transition p-3 rounded-2xl dark:text-white ${
            isActive && 'bg-accent-1 text-white'
          } ${expanded && 'w-full'} hover:bg-accent-2 hover:text-white`
        }
      >
        {icon}
        {expanded && <h3 className='ml-3 text-[12px]'>{name}</h3>}
      </NavLink>

      {!expanded && (
        <div
          className={`absolute left-full rounded-md px-2 py-1 ml-6 bg-accent-2 text-white text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:-translate-x-0`}
        >
          {name}
        </div>
      )}
    </li>
  );
};

SidebarItem.propTypes = {
  name: string,
  icon: any,
  link: string,
  expanded: bool,
};

export default SidebarItem;
