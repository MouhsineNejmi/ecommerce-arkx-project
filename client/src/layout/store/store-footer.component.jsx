import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter } from 'lucide-react';

import { Separator } from '../../components/ui/separator';

import { navbarData } from '../../data/navigation-data';

const StoreFooter = () => {
  return (
    <footer className='custom-container bg-foreground text-white py-8'>
      <div className='flex flex-col md:flex-row justify-between py-8'>
        {/* First Part: Logo and Social Media Links */}
        <div className='mb-4 flex flex-col gap-2'>
          <h2 className='font-bold mb-4 font-semibold text-lg'>
            Desing <span className='text-gold text-lg'>Elegance</span>
          </h2>

          <div className='text-sm flex flex-col gap-3 mb-4'>
            <p>Boulevard Ghandi</p>
            <p>Casablanca, Morocco</p>
            <p>Call us: 84-756-3237</p>
          </div>

          <div className='flex space-x-4'>
            {/* Add your social media icons/links */}
            <Link>
              <Facebook className='w-6 h-6 hover:text-gold' />
            </Link>
            <Link>
              <Instagram className='w-6 h-6 hover:text-gold' />
            </Link>
            <Link>
              <Twitter className='w-6 h-6 hover:text-gold' />
            </Link>
          </div>
        </div>

        {/* Second Part: Navigation Links */}
        <div className='mb-4 md:mb-0'>
          <h3 className='text-lg font-bold mb-4'>Navigation</h3>
          <ul className='flex flex-col gap-3'>
            {navbarData.map((item, index) => (
              <li key={index}>
                <Link to={item.link} className='hover:text-gold'>
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Third Part: Info, Shipping Policy, Refund */}
        <div>
          <h3 className='text-lg font-bold mb-4'>Information</h3>
          <ul className='flex flex-col gap-3'>
            <li>
              <Link to='/info' className='hover:text-gold'>
                Info
              </Link>
            </li>
            <li>
              <Link to='/shipping-policy' className='hover:text-gold'>
                Shipping Policy
              </Link>
            </li>
            <li>
              <Link to='/refund' className='hover:text-gold'>
                Refund
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <Separator />

      {/* Add additional styling or components for the overall footer */}
    </footer>
  );
};

export default StoreFooter;
