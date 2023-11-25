import { Link } from 'react-router-dom';
import { TicketIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

const DiscountBar = () => {
  const [isHidden, setIsHidden] = useState(false);

  return (
    <div
      className={`${
        isHidden ? 'hidden' : ''
      } relative h-10 bg-violet-500 text-white flex justify-center items-center overflow-hidden`}
    >
      <div className='flex items-center gap-2 font-semibold'>
        <TicketIcon className='w-6 h-6' />
        <h3 className='text-sm'>30% off storewide - Limited Time!</h3>
      </div>

      <Link to='/shop' className='ml-4 underline text-sm font-bold'>
        Shop now &rarr;
      </Link>

      <XMarkIcon
        className='absolute w-5 h-5 right-2 top-1/2 -translate-y-1/2 cursor-pointer'
        onClick={() => setIsHidden(true)}
      />
    </div>
  );
};

export default DiscountBar;
