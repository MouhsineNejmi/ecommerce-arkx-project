import { Loader2 } from 'lucide-react';
import { useGetAllOrdersQuery } from '../app/api/orders.api';
import Stats from '../components/stats/stats.component';
import Charts from '../components/charts/charts.component';
import OrdersTable from '../components/orders-table.component';

const Dashboard = () => {
  const { data: orders, isLoading } = useGetAllOrdersQuery();

  return (
    <>
      <h1 className='font-bold text-2xl mb-6 text-center'>Store Analytics</h1>
      <Stats />
      <div className='w-full flex gap-4 mb-8'>
        <Charts />
        {isLoading ? <Loader2 /> : <OrdersTable orders={orders} />}
      </div>
    </>
  );
};

export default Dashboard;
