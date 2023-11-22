import { CreditCard, DollarSign, Package, Users } from 'lucide-react';
import StatsItem from './stats-item.component';

const statsData = [
  {
    name: 'Total Revenue',
    icon: <DollarSign size={16} color='gray' />,
    amount: '$45,231.89',
    growth: '+20.1% from last month',
  },
  {
    name: 'Total of Registered Customers',
    icon: <Users size={16} color='gray' />,
    amount: '235',
  },
  {
    name: 'Number of Sales',
    icon: <CreditCard size={16} color='gray' />,
    amount: '231',
    growth: '+12% from last month',
  },
  {
    name: 'Last Placed Orders',
    icon: <Package size={16} color='gray' />,
    amount: '50',
    growth: '+20.1% from last month',
  },
];

const Stats = () => {
  return (
    <div className='grid gap-4 mb-4 md:grid-cols-2 lg:grid-cols-4'>
      {statsData.map((stat) => (
        <StatsItem
          key={stat.name}
          name={stat.name}
          icon={stat.icon}
          amount={stat.amount}
          growth={stat.growth}
        />
      ))}
    </div>
  );
};

export default Stats;
