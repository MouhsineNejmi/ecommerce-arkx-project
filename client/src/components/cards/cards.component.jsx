import CardItem from './card-item.component';
import { Activity, CreditCard, DollarSign, Users } from 'lucide-react';

const Cards = () => {
  return (
    <div className='grid gap-4 mb-4 md:grid-cols-2 lg:grid-cols-4'>
      <CardItem
        name='Total Revenue'
        icon={<DollarSign size={16} color='gray' />}
        amount='$45,231.89'
        growth='+20.1% from last month'
      />
      <CardItem
        name='Subscriptions'
        icon={<Users size={16} color='gray' />}
        amount='+2350'
        growth='+180.1% from last month'
      />
      <CardItem
        name='Sales'
        icon={<CreditCard size={16} color='gray' />}
        amount='+12,234'
        growth='+19% from last month'
      />
      <CardItem
        name='Active Now'
        icon={<Activity size={16} color='gray' />}
        amount='+573'
        growth='+20.1% from last hour'
      />
    </div>
  );
};

export default Cards;
