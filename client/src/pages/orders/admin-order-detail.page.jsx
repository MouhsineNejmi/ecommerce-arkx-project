import { useParams } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

import { Badge } from '../../components/ui/badge';
import OrderItemsComponent from '../../components/order-items.component';

import { orderStatuses } from '../../data/table-data';
import { useGetOrderByIdQuery } from '../../app/api/orders.api';
import { dateFormatter } from '../../helpers/dateFormatter';

const AdminOrderDetails = () => {
  const { orderId } = useParams();
  const { data: order, isLoading } = useGetOrderByIdQuery(orderId);

  const status =
    !isLoading &&
    orderStatuses.find((status) => status.value === order.delivery_status);

  console.log(order);

  return isLoading ? (
    <Loader2 className='animate-spin' />
  ) : (
    <div>
      <div className='mb-4 flex items-center gap-2 mb-4'>
        <h2 className='text-xl font-bold'>Order ID: {order._id}</h2>
        {status ? (
          <div className='flex items-center'>
            {status.icon && (
              <status.icon className={`mr-1 h-4 w-4 ${status.color}`} />
            )}
            <Badge
              variant='outline'
              className={`font-medium ${status.badgeStyles}`}
            >
              {status.label}
            </Badge>
          </div>
        ) : null}
      </div>

      <div className='bg-background rounded-xl p-8'>
        <h4 className='font-bold mb-2'>Order Items:</h4>
        <OrderItemsComponent orders={order.order_items} total={order.total} />
      </div>

      <div className='flex gap-4'>
        <div className='flex flex-col gap-2 bg-background rounded-xl p-8 w-1/2'>
          <h4 className='font-bold mb-2'>Order Details:</h4>

          <div className='flex items-center justify-between gap-4'>
            <h3>Order Date:</h3>
            <p className='text-zinc-500'>{dateFormatter(order.order_date)}</p>
          </div>

          <div className='flex items-center justify-between gap-4'>
            <h3>Delivery Status:</h3>
            <p className='text-zinc-500'>{order.delivery_status}</p>
          </div>

          <div className='flex items-center justify-between gap-4'>
            <h3>Customer id:</h3>
            <p className='text-zinc-500'>{order.customer_id._id}</p>
          </div>

          <div className='flex items-center justify-between gap-4'>
            <h3>Customer name:</h3>
            <p className='text-zinc-500'>
              {order.customer_id.first_name + ' ' + order.customer_id.last_name}
            </p>
          </div>

          <div className='flex items-center justify-between gap-4'>
            <h3>Customer username:</h3>
            <p className='text-zinc-500'>{order.customer_id.username}</p>
          </div>

          <div className='flex items-center justify-between gap-4'>
            <h3>Customer email:</h3>
            <p className='text-zinc-500'>{order.customer_id.email}</p>
          </div>
        </div>

        <div className='flex flex-col gap-2 bg-background rounded-xl p-8 w-1/2'>
          <h4 className='font-bold mb-2'>Shipping Details:</h4>

          <div className='flex items-center justify-between gap-4'>
            <h3>Buyer name:</h3>
            <p className='text-zinc-500'>{order.shipping.name}</p>
          </div>

          <div className='flex items-center justify-between gap-4'>
            <h3>Buyer email:</h3>
            <p className='text-zinc-500'>{order.shipping.email}</p>
          </div>

          <div className='flex items-center justify-between gap-4'>
            <h3>Buyer Phone Number:</h3>
            <p className='text-zinc-500'>{order.shipping.phone}</p>
          </div>

          <div className='flex items-center justify-between gap-4'>
            <h3>Country:</h3>
            <p className='text-zinc-500'>{order.shipping.address.country}</p>
          </div>

          <div className='flex items-center justify-between gap-4'>
            <h3>Street Address:</h3>
            <p className='text-zinc-500'>{order.shipping.address.line1}</p>
          </div>

          <div className='flex items-center justify-between gap-4'>
            <h3>Postal Code:</h3>
            <p className='text-zinc-500'>
              {order.shipping.address.postal_code}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOrderDetails;
