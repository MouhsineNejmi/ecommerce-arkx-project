/* eslint-disable react/prop-types */
import { orderStatuses } from '../data/table-data';
import { Badge } from './ui/badge';

const OrdersTable = ({ orders }) => {
  const getStatus = (order) => {
    const status = orderStatuses.find(
      (status) => status.value === order.status
    );
    if (!status) {
      return null;
    }
    return (
      <div className='flex w-[100px] items-center'>
        {status.icon && (
          <status.icon className={`mr-2 h-4 w-4 ${status.color}`} />
        )}
        <Badge
          variant='outline'
          className={`font-medium ${status.badgeStyles}`}
        >
          {status.label}
        </Badge>
      </div>
    );
  };
  return (
    <div className=' relative overflow-x-auto rounded-sm border border-slate-300'>
      <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400 '>
        <thead className='text-xs text-gray-700 uppercase border-b border-slate-300'>
          <tr className=''>
            <th scope='col' className='font-semibold px-6 py-3'>
              Order ID
            </th>
            <th scope='col' className='font-semibold px-6 py-3'>
              Customer
            </th>
            <th scope='col' className='font-semibold px-6 py-3'>
              Status
            </th>
            <th scope='col' className='font-semibold px-6 py-3'>
              Total
            </th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => {
            return (
              <tr className='bg-white border-b border-slate-300' key={index}>
                <td className='px-6 py-4'>
                  <Badge variant={'outline'} className={'font-medium'}>
                    {order._id}
                  </Badge>
                </td>
                <td className='px-6 py-4'>
                  <Badge variant={'outline'} className={'font-medium'}>
                    {order.customer_id._id}
                  </Badge>
                </td>
                <td className='px-6 py-4'>
                  {getStatus(order)}
                  {/* <Badge variant={"outline"}>{order.status}</Badge> */}
                </td>
                <td className='px-6 py-4 whitespace-nowrap'>
                  <p className={'font-medium'}>
                    {`${order.cart_total_price},00 MAD`}
                  </p>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersTable;
