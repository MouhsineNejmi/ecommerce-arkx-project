/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
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
      {items.map((item) => (
        <Link
          key={item.link}
          to={item.link}
          className={({ isActive }) =>
            `justify-start ${
              isActive
                ? 'bg-muted hover:bg-muted'
                : 'hover:bg-transparent hover:underline'
            }`
          }
        >
          {item.title}
        </Link>
      ))}
    </nav>
  );
};

export default ProfileSidebar;
