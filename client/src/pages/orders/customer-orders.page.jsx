import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { useGetMyProfileDataQuery } from '../../app/api/users.api';
import { useGetOrderByCustomerIdMutation } from '../../app/api/orders.api';

import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableFooter,
} from '../../components/ui/table';
import { Button } from '../../components/ui/button';

const CustomerOrders = () => {
  const [orders, setOrders] = useState([]);
  const [total, setTotal] = useState(0);
  const [showOrders, setShowOrders] = useState(false);

  const { data: customer, isLoading: isLoadingCustomerData } =
    useGetMyProfileDataQuery();
  const customer_id = customer?._id;

  const [getOrderByCustomerId, { isLoading }] =
    useGetOrderByCustomerIdMutation();

  const loadCustomerOrders = async () => {
    const { data: orders } = await getOrderByCustomerId(customer_id);
    console.log(orders);

    const totalAmount =
      orders && orders.reduce((total, order) => total + order.total, 0);

    setOrders(orders);
    setTotal(totalAmount);
  };

  const handleViewOrders = () => setShowOrders(!showOrders);

  const handleClick = () => {
    loadCustomerOrders();
    handleViewOrders();
  };

  return isLoadingCustomerData ? (
    <Loader2 className='animate-spin' />
  ) : (
    <>
      <Button onClick={handleClick} disabled={isLoading}>
        {!showOrders ? 'View orders' : 'Hide orders'}
      </Button>
      {showOrders && (
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
            {orders &&
              orders?.map(({ order_items }) =>
                order_items.map(({ product, quantity }) => (
                  <TableRow key={product._id}>
                    <TableCell className='flex items-center gap-4 w-full font-medium'>
                      <img
                        src={product.product_images[0]}
                        alt={product.product_name}
                        className='bg-cover bg-norepeat bg-center w-32 object-cover rounded-md'
                      />
                      <h3 className='font-semibold text-sm w-1/2'>
                        {product.product_name}
                      </h3>
                    </TableCell>

                    <TableCell>
                      <span className='text-lg'>{quantity}</span>
                    </TableCell>

                    <TableCell>${product.price}</TableCell>
                    <TableHead>
                      ${(product.price * quantity).toFixed(2)}
                    </TableHead>
                  </TableRow>
                ))
              )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Total</TableCell>
              <TableCell className='text-right'>${total.toFixed(2)}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      )}
    </>
  );
};

export default CustomerOrders;
