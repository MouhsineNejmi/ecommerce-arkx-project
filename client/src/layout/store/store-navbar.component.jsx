import { Link, NavLink } from 'react-router-dom';
import {
  MagnifyingGlassIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';

import UserDropDownMenu from '../../components/user/user-dropdown-menu.component';
import Cart from '../../components/cart';
import ModeToggle from '../../components/ui/mode-toggle.component';
import { Skeleton } from '../../components/ui/skeleton';

import { useGetMyProfileDataQuery } from '../../app/api/users.api';
import { navbarData } from '../../data/navigation-data';

const StoreNavbar = () => {
  const { data: user, isLoading } = useGetMyProfileDataQuery();

  return (
    <nav className='flex justify-between items-center h-20 px-20'>
      {/* Logo */}
      <Link to='/' className='font-bold'>
        Desing <span className='text-gold'>Elegance</span>
      </Link>

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
        <ModeToggle />
        <MagnifyingGlassIcon className='w-5 h-5 cursor-pointer' />
        {user ? (
          <UserDropDownMenu />
        ) : !user && isLoading ? (
          <Skeleton className='h-12 w-12 rounded-full' />
        ) : (
          <Link to='/auth' className='flex items-center gap-2'>
            <UserCircleIcon className='w-6 h-6' />
            <p>Login</p>
          </Link>
        )}
        {user && (
          <div className='flex items-center gap-1'>
            <Cart />
          </div>
        )}
      </div>
    </nav>
  );
};

export default StoreNavbar;
