/* eslint-disable react/prop-types */
import { useDispatch } from 'react-redux';
import {
  ArrowRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components/ui/table';
import { Button } from '../../components/ui/button';

import {
  useAddToCartMutation,
  useClearCartMutation,
  useDecreaseQuantityMutation,
} from '../../app/api/cart.api';
import {
  addProductToCart,
  decreaseProductQuantity,
  clearCartItems,
} from '../../app/features/cart.slice';

import CheckoutItem from './checkout-item.component';

const CheckoutTable = ({ cart, totalAmount, handleStepChange }) => {
  const dispatch = useDispatch();

  const [addToCart, { isLoading: isAddingToCart }] = useAddToCartMutation();
  const [decreaseQuantity, { isLoading: isDecreasingQuantity }] =
    useDecreaseQuantityMutation();
  const [clearCart, { isLoading: isClearingCart }] = useClearCartMutation();

  const handleAddToCart = async (product) => {
    dispatch(addProductToCart(product));
    await addToCart(product._id);
  };

  const handlDecreaseProductQuantity = async (productId) => {
    dispatch(decreaseProductQuantity(productId));
    await decreaseQuantity(productId);
  };

  const handleClearCart = async () => {
    dispatch(clearCartItems());
    await clearCart();
  };

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cart &&
            cart.map(({ product, quantity }) => (
              <TableRow key={product._id}>
                <TableCell className='font-medium'>
                  <CheckoutItem product={product} />
                </TableCell>

                <TableCell>
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
                </TableCell>

                <TableCell>${product.price}</TableCell>
                <TableHead>${(product.price * quantity).toFixed(2)}</TableHead>
              </TableRow>
            ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className='text-right'>
              ${totalAmount.toFixed(2)}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>

      <div className='flex justify-between items-center mt-4'>
        <Button
          className='bg-transparent border border-gold text-gold hover:text-white hover:bg-gold'
          disabled={isClearingCart}
          onClick={handleClearCart}
        >
          <XMarkIcon className='w-4 h-4' />
          Clear Items
        </Button>

        <Button className='gap-2' onClick={() => handleStepChange(2)}>
          Checkout
          <ArrowRightIcon className='w-4 h-4' />
        </Button>
      </div>
    </div>
  );
};

export default CheckoutTable;
