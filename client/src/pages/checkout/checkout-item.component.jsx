/* eslint-disable react/prop-types */
import { XMarkIcon } from '@heroicons/react/24/outline';

import { Button } from '../../components/ui/button';

import { useDispatch } from 'react-redux';
import { useRemoveFromCartMutation } from '../../app/api/cart';
import { removeProductFromCart } from '../../app/features/cart.slice';

const CheckoutItem = ({ product }) => {
  const dispatch = useDispatch();

  const [removeFromCart, { isLoading: isRemovingFromCart }] =
    useRemoveFromCartMutation();

  const handlRemoveFromCart = async (productId) => {
    dispatch(removeProductFromCart(productId));
    await removeFromCart(productId);
  };

  return (
    <div className='flex gap-4 h-max overflow-hidden'>
      <img
        src={product.product_images[0]}
        alt={product.product_name}
        className='bg-cover bg-norepeat bg-center w-32 object-cover rounded-md'
      />

      <div className='w-full flex justify-between'>
        <div className='flex flex-col gap-4'>
          <h3 className='font-semibold text-sm'>{product.product_name}</h3>

          <Button
            className='p-0 w-max h-8 flex items-center gap-1 bg-transparent text-[#B1B5C3]'
            disabled={isRemovingFromCart}
            onClick={() => handlRemoveFromCart(product._id)}
          >
            <XMarkIcon className='w-5 h-5 cursor-pointer' />
            Remove
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutItem;
