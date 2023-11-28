import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  MagnifyingGlassIcon,
  UserCircleIcon,
  ShoppingBagIcon,
} from '@heroicons/react/24/outline';

import UserDropDownMenu from '../../components/user/user-dropdown-menu.component';

import { navbarData } from '../../data/navigation-data';

const StoreNavbar = () => {
  const user = useSelector((state) => state.userSlice.user);

  return (
    <nav className='flex justify-between items-center h-20 px-20'>
      {/* Logo */}
      <h2 className='font-bold'>
        Desing <span className='text-gold'>Elegance</span>
      </h2>

      {/* NavList */}
      <ul className='flex items-center space-x-4'>
        {navbarData.map(({ link, title }) => (
          <li key={title}>
            <NavLink
              to={link}
              className={({ isActive }) =>
                `${isActive ? 'nav-link' : ''} hover:nav-link`
              }
            >
              {title}
            </NavLink>
          </li>
        ))}
      </ul>

      {/* Icons */}
      <div className='flex items-center space-x-4'>
        <MagnifyingGlassIcon className='w-5 h-5 cursor-pointer' />
        {user ? (
          <UserDropDownMenu />
        ) : (
          <div className='flex items-center gap-2'>
            <UserCircleIcon className='w-6 h-6' />
            <p>Login</p>
          </div>
        )}
        <div className='flex items-center gap-1'>
          <ShoppingBagIcon className='w-5 h-5 cursor-pointer' />
          <p className='flex items-center justify-center w-5 h-5 bg-gold text-background rounded-full'>
            <span className='block font-medium text-sm'>2</span>
          </p>
        </div>
      </div>
    </nav>
  );
};

export default StoreNavbar;
