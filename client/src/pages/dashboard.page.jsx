import SellersSwitcher from '../components/sellers-switcher.component';
import Cards from '../components/cards/cards.component';
import Charts from '../components/charts/charts.component';
import RecentOrders from '../components/recent-orders/recent-orders.component';

const Dashboard = () => {
  return (
    <div className='p-4'>
      <SellersSwitcher />
      <Cards />
      <div className='w-full flex gap-4 mb-8'>
        <Charts />
        <RecentOrders />
      </div>
    </div>
  );
};

export default Dashboard;
