/* eslint-disable react/prop-types */
import { useDispatch } from 'react-redux';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Button } from '../ui/button';

import {
  useAddToCartMutation,
  useDecreaseQuantityMutation,
  useRemoveFromCartMutation,
} from '../../app/api/cart.api';
import {
  addProductToCart,
  decreaseProductQuantity,
  removeProductFromCart,
} from '../../app/features/cart.slice';

const CartItem = ({ product, quantity }) => {
  const dispatch = useDispatch();

  const [addToCart, { isLoading: isAddingToCart }] = useAddToCartMutation();
  const [decreaseQuantity, { isLoading: isDecreasingQuantity }] =
    useDecreaseQuantityMutation();
  const [removeFromCart, { isLoading: isRemovingFromCart }] =
    useRemoveFromCartMutation();

  const handleAddToCart = async (product) => {
    dispatch(addProductToCart(product));
    await addToCart(product._id);
  };

  const handlRemoveFromCart = async (productId) => {
    dispatch(removeProductFromCart(productId));
    await removeFromCart(productId);
  };

  const handlDecreaseProductQuantity = async (productId) => {
    dispatch(decreaseProductQuantity(productId));
    await decreaseQuantity(productId);
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

          <Select>
            <SelectTrigger className='w-24 h-8 text-xs'>
              <SelectValue placeholder='Color' />
            </SelectTrigger>

            <SelectContent>
              <SelectGroup>
                {product.options.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <div className='flex items-center gap-2'>
            <Button
              variant='outline'
              className='w-8 h-8 p-0 hover:bg-gold hover:text-white'
              disabled={isDecreasingQuantity}
              onClick={() => handlDecreaseProductQuantity(product._id)}
            >
              <ChevronLeftIcon className='w-4 h-4 cursor-pointer' />
            </Button>

            <span className='text-lg'>{quantity}</span>

            <Button
              variant='outline'
              className='w-8 h-8 p-0 hover:bg-gold hover:text-white'
              disabled={isAddingToCart}
              onClick={() => handleAddToCart(product)}
            >
              <ChevronRightIcon className='w-4 h-4 cursor-pointer' />
            </Button>
          </div>
        </div>

        <div className='flex flex-col items-end'>
          <h4 className='text-sm'>${product.price}</h4>
          <Button
            variant={'outline'}
            className='w-7 h-7 p-0 text-red-500 hover:bg-red-500 hover:text-white'
            disabled={isRemovingFromCart}
            onClick={() => handlRemoveFromCart(product._id)}
          >
            <XMarkIcon className='w-5 h-5 cursor-pointer' />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
