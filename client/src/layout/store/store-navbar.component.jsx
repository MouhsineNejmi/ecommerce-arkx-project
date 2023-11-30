import { Link, NavLink } from 'react-router-dom';
import {
  MagnifyingGlassIcon,
  UserCircleIcon,
  ArrowPathIcon,
} from '@heroicons/react/24/outline';

import UserDropDownMenu from '../../components/user/user-dropdown-menu.component';
import Cart from '../cart/cart.component';

import { useGetMyProfileDataQuery } from '../../app/api/users.api';
import { navbarData } from '../../data/navigation-data';

const StoreNavbar = () => {
  const { data: user, isLoading } = useGetMyProfileDataQuery();

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
          <UserDropDownMenu user={user} />
        ) : !user && isLoading ? (
          <ArrowPathIcon className='w-6 h-6 animate-spin' />
        ) : (
          <Link to='/auth' className='flex items-center gap-2'>
            <UserCircleIcon className='w-6 h-6' />
            <p>Login</p>
          </Link>
        )}
        <div className='flex items-center gap-1'>
          <Cart />
        </div>
      </div>
    </nav>
  );
};

export default StoreNavbar;
