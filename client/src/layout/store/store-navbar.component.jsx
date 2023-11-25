import { NavLink } from 'react-router-dom';
import {
  MagnifyingGlassIcon,
  UserCircleIcon,
  ShoppingBagIcon,
} from '@heroicons/react/24/outline';

const navbarItems = [
  {
    link: '/',
    title: 'Home',
  },
  {
    link: '/shop',
    title: 'Shop',
  },
];

const StoreNavbar = () => {
  return (
    <nav className='flex justify-between items-center h-16 px-20'>
      {/* Logo */}
      <div className='flex items-center'>
        <h1 className='font-bold'>
          Desing <span className='text-violet-700'>Elegance</span>
        </h1>
      </div>

      {/* NavList */}
      <ul className='flex items-center space-x-4'>
        {navbarItems.map(({ link, title }) => (
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
        <UserCircleIcon className='w-6 h-6 cursor-pointer' />
        <div className='flex items-center gap-1'>
          <ShoppingBagIcon className='w-5 h-5 cursor-pointer' />
          <p className='flex items-center justify-center w-5 h-5 bg-violet-700 text-background rounded-full'>
            <span className='block font-medium text-sm'>2</span>
          </p>
        </div>
      </div>
    </nav>
  );
};

export default StoreNavbar;
