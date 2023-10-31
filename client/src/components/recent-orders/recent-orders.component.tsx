import RecentOrderItem from './recent-order-item.component';

const RecentOrders = () => {
  return (
    <div className='w-2/5 p-4 rounded-xl shadow-md dark:bg-secondary'>
      <h3>Recent Orders</h3>
      <RecentOrderItem />
    </div>
  );
};

export default RecentOrders;
