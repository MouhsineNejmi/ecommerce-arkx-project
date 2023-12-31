import { useEffect } from 'react';

import { useToast } from '../../components/ui/use-toast';
import { useGetAllOrdersQuery } from '../../app/api/orders.api';

import getColumns from '../../components/ui/columns';
import DataTable from '../../components/ui/data-table';

const AdminOrders = () => {
  const { toast } = useToast();
  const { data, isLoading, isError, error } = useGetAllOrdersQuery();

  const columns = getColumns({
    keyOne: '_id',
    keyOneTitle: 'Order ID',
    keyTwo: 'customer_id',
    keyTwoTitle: 'Customer Email',
    keyThree: 'status',
    keyThreeTitle: 'Ordrer Status',
    keyFour: 'order_date',
    keyFourTitle: 'Order Date',
    keyFive: 'cart_total_price',
    keyFiveTitle: 'Total price',
    option: 'orders',
  });

  useEffect(() => {
    if (isError) {
      if (Array.isArray(error).data.error) {
        error.data.error.forEach((el) =>
          toast({ title: el.message, variant: 'destructive' })
        );
      } else {
        toast({ title: error.data.message, variant: 'destructive' });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  return (
    <div>
      <div className='flex items-center justify-between mb-5'>
        <h1 className='text-lg font-bold'>Orders</h1>
      </div>

      {data && (
        <DataTable
          data={data}
          columns={columns}
          option={'orders'}
          isLoading={isLoading}
        />
      )}
    </div>
  );
};

export default AdminOrders;
