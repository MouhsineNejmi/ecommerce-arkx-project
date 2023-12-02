/* eslint-disable react/prop-types */
import { NavLink } from 'react-router-dom';
import { cn } from '../../lib/utils';

const ProfileSidebar = ({ className, items, ...props }) => {
  return (
    <nav
      className={cn(
        'flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1',
        className
      )}
      {...props}
    >
      {items.map((item, index) => (
        <NavLink
          key={index}
          to={item.link}
          className={({ isActive }) =>
            `justify-start ${
              isActive ? 'bg-muted' : 'hover:bg-transparent hover:underline'
            }`
          }
        >
          {item.title}
        </NavLink>
      ))}
    </nav>
  );
};

export default ProfileSidebar;
