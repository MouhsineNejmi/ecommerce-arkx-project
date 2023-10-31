import Layout from '@/layout/layout.component';
import SellersSwitcher from '@/components/sellers-switcher.component';
import Cards from '@/components/cards/cards.component';
import Charts from '@/components/charts/charts.component';
import RecentOrders from '@/components/recent-orders/recent-orders.component';
import { DataTable } from '@/components/ui/data-table';
import { columns } from '@/components/tables/columns';
import productsData from '@/data/products.json';

const Dashboard = () => {
  return (
    <Layout>
      <SellersSwitcher />
      <Cards />
      <div className='w-full flex gap-4 mb-8'>
        <Charts />
        <RecentOrders />
      </div>
      <div>
        <h3 className='text-md font-semibold mb-4'>Top Selling Products</h3>
        <DataTable columns={columns} data={productsData} />
      </div>
    </Layout>
  );
};

export default Dashboard;
