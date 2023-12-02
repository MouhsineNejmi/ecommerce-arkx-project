import { useState } from 'react';
import { XMarkIcon, ShoppingBagIcon } from '@heroicons/react/24/outline';

import { Separator } from '../../components/ui/separator';

const Cart = () => {
  const [open, setOpen] = useState(false);
  const handleOpenDialog = () => setOpen(!open);

  return (
    <div>
      <div className='flex items-center'>
        <ShoppingBagIcon
          onClick={handleOpenDialog}
          className='w-5 h-5 cursor-pointer'
        />
        <p className='flex items-center justify-center w-5 h-5 bg-gold text-background rounded-full'>
          <span className='block font-medium text-sm'>2</span>
        </p>
      </div>

      <div
        className={`${
          open ? 'fixed' : 'hidden'
        } right-0 top-0 w-screen h-screen flex z-10`}
      >
        <div
          className='w-9/12 bg-black opacity-20'
          onClick={handleOpenDialog}
        />
        <div className='w-3/12 bg-background py-6'>
          <div className='flex justify-between items-center mb-4 px-4'>
            <h1 className='font-bold text-xl'>Cart</h1>
            <XMarkIcon
              className='cursor-pointer w-6 h-6'
              onClick={handleOpenDialog}
            />
          </div>
          <Separator className='bg-slate-300 mb-4' />
        </div>
      </div>
    </div>
  );
};

export default Cart;
