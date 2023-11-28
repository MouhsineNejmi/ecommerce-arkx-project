/* eslint-disable react/prop-types */
import { HomeIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom'; // Assuming you're using React Router

import { cn } from '../../lib/utils';

const paths = [
  { label: 'Home', link: '/' },
  { label: 'Shop', link: '/shop' },
];

const Breadcrumb = ({ className }) => {
  return (
    <nav className={cn('p-4', className)}>
      <ul className='flex'>
        {paths.map((path, index) => (
          <>
            {path.label === 'Home' ? (
              <li key={index} className='flex items-center'>
                <Link
                  to={path.link}
                  className='flex items-center gap-2 text-gold hover:underline text-lg'
                >
                  <HomeIcon className='w-5 h-5 font-semibold' />
                  {path.label}
                </Link>
                <span className='mx-2 font-semibold text-lg'>/</span>
              </li>
            ) : (
              <li key={index} className='flex items-center'>
                {index < paths.length - 1 ? (
                  <>
                    <Link
                      to={path.link}
                      className='text-gold hover:underline text-lg'
                    >
                      {path.label}
                    </Link>
                    <span className='mx-2 font-semibold text-lg'>/</span>
                  </>
                ) : (
                  <span className='font-semibold text-lg'>{path.label}</span>
                )}
              </li>
            )}
          </>
        ))}
      </ul>
    </nav>
  );
};

export default Breadcrumb;
