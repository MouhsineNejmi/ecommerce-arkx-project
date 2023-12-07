import { useSelector, useDispatch } from 'react-redux';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components/ui/table';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';
import { Button } from '../../components/ui/button';

import { cartSelector, selectTotalAmount } from '../../app/features/cart.slice';
import {
  useAddToCartMutation,
  useDecreaseQuantityMutation,
} from '../../app/api/cart';
import {
  addProductToCart,
  decreaseProductQuantity,
} from '../../app/features/cart.slice';

import CheckoutItem from './checkout-item.component';

const CheckoutTable = () => {
  const cart = useSelector(cartSelector);
  const totalAmount = useSelector(selectTotalAmount);

  const dispatch = useDispatch();

  const [addToCart, { isLoading: isAddingToCart }] = useAddToCartMutation();
  const [decreaseQuantity, { isLoading: isDecreasingQuantity }] =
    useDecreaseQuantityMutation();

  const handleAddToCart = async (product) => {
    dispatch(addProductToCart(product));
    await addToCart(product._id);
  };

  const handlDecreaseProductQuantity = async (productId) => {
    dispatch(decreaseProductQuantity(productId));
    await decreaseQuantity(productId);
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Product</TableHead>
          <TableHead>Option</TableHead>
          <TableHead>Quantity</TableHead>
          <TableHead>Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {cart.map(({ product, quantity }) => (
          <TableRow key={product._id}>
            <TableCell className='font-medium'>
              <CheckoutItem product={product} />
            </TableCell>

            <TableCell>
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
  );
};

export default CheckoutTable;
