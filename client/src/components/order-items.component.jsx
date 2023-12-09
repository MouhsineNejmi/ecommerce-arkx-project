/* eslint-disable react/prop-types */
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableFooter,
} from './ui/table';

const OrderItemsComponent = ({ orders, total }) => {
  return (
    <>
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
            orders.map(({ product, quantity }) => (
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
                <TableHead>${(product.price * quantity).toFixed(2)}</TableHead>
              </TableRow>
            ))}
        </TableBody>

        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className='text-right'>${total.toFixed(2)}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </>
  );
};

export default OrderItemsComponent;
