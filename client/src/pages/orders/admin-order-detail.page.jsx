import { useParams } from 'react-router-dom';
import { useGetOrderByIdQuery } from '../../app/api/orders.api';
import { Loader2 } from 'lucide-react';

const AdminOrderDetails = () => {
  const { orderId } = useParams();
  const { data: order, isLoading } = useGetOrderByIdQuery(orderId);

  console.log(orderId);
  console.log(order);

  return isLoading ? (
    <Loader2 className='animate-spin' />
  ) : (
    <div>{JSON.stringify(order)}</div>
  );
};

export default AdminOrderDetails;
