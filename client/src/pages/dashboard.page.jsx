import { Loader2 } from 'lucide-react';

import Stats from '../components/stats/stats.component';
import Charts from '../components/charts/charts.component';
import OrdersTable from '../components/orders-table.component';
import ChartBar from '../components/charts/chart-bar.component';

import { useGetAllOrdersQuery } from '../app/api/orders.api';

const Dashboard = () => {
  const { data: orders, isLoading } = useGetAllOrdersQuery();

  return (
    <>
      <h1 className='font-bold text-2xl mb-6 text-center'>Store Analytics</h1>
      <Stats />
      <div className='grid grid-cols-2 gap-4 mb-6'>
        <Charts />
        <ChartBar />
      </div>
      {isLoading ? <Loader2 /> : <OrdersTable orders={orders} />}
    </>
  );
};

export default Dashboard;
