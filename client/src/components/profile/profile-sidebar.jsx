/* eslint-disable react/prop-types */
import { NavLink } from 'react-router-dom';
import { cn } from '../../lib/utils';

const ProfileSidebar = ({ className, items, ...props }) => {
  return (
    <nav className={cn('flex flex-col gap-2 rounded-md', className)} {...props}>
      {items.map((item, index) => (
        <NavLink
          key={index}
          to={item.to}
          className={({ isActive }) =>
            `justify-start w-full ${
              isActive
                ? 'underline font-bold'
                : 'hover:bg-transparent hover:underline'
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
