import { useState } from 'react';
import { Link } from 'react-router-dom';
import { XMarkIcon, ShoppingBagIcon } from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { Loader2 } from 'lucide-react';
import { useSelector } from 'react-redux';

import { cartSelector, selectTotalAmount } from '../../app/features/cart.slice';
import { useGetCartQuery } from '../../app/api/cart.api';

import { Separator } from '../ui/separator';
import CartItems from './cart-items.component';

const CartComponent = () => {
  const [open, setOpen] = useState(false);
  const handleOpenDialog = () => setOpen(!open);

  const { isLoading } = useGetCartQuery();

  const cart = useSelector(cartSelector);
  const totalAmount = useSelector(selectTotalAmount);

  return isLoading ? (
    <Loader2 className='animate-spin' />
  ) : (
    <div>
      <div className='flex items-center'>
        <ShoppingBagIcon
          onClick={handleOpenDialog}
          className='w-5 h-5 cursor-pointer'
        />
        <p className='flex items-center justify-center w-5 h-5 bg-gold text-background rounded-full'>
          <span className='block font-medium text-sm'>{cart.length}</span>
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
        <div className='w-3/12 flex flex-col bg-background pt-6'>
          <div className='flex justify-between items-center mb-4 px-4'>
            <h3 className='font-bold text-xl'>Cart</h3>
            <XMarkIcon
              className='cursor-pointer w-6 h-6'
              onClick={handleOpenDialog}
            />
          </div>

          <Separator className='bg-slate-300 mb-4' />

          {/* Cart items */}
          <div className='flex-grow overflow-scroll'>
            {cart && <CartItems cartItems={cart} />}
          </div>

          <Separator className='bg-slate-300 mb-4' />

          <div className='px-4 pb-4'>
            <div className='flex justify-between items-center h-14'>
              <h4 className='text-lg underline'>Total Amount:</h4>
              <p>${totalAmount.toFixed(2)}</p>
            </div>

            <Link
              to='/checkout'
              className='w-full h-12 flex justify-center items-center gap-2 rounded-md bg-foreground text-background  font-semibold text-sm'
            >
              Go To Checkout <ArrowRightIcon className='w-5 h-5' />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartComponent;
