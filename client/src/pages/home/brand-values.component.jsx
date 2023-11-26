import {
  BanknotesIcon,
  LockClosedIcon,
  PhoneIcon,
  TruckIcon,
} from '@heroicons/react/24/outline';

const brandValues = [
  {
    name: 'Free Shipping',
    condition: 'Order above $200',
    icon: <TruckIcon className='w-8 h-8' />,
  },
  {
    name: 'Money-back',
    condition: '30 day guarantee',
    icon: <BanknotesIcon className='w-8 h-8' />,
  },
  {
    name: 'Secure Payments',
    condition: 'Secured by Stripe',
    icon: <LockClosedIcon className='w-8 h-8' />,
  },
  {
    name: '24/7 Support',
    condition: 'Phone and Email support',
    icon: <PhoneIcon className='w-8 h-8' />,
  },
];

const BrandValues = () => {
  return (
    <div className='w-full h-[250px] custom-container py-4 gap-4 flex'>
      {brandValues.map((value, index) => (
        <div
          key={index}
          className='grow shrink basis-0 bg-gold px-8 py-12 flex flex-col gap-4 rounded-lg text-white'
        >
          <div className='w-12 h-12 relative'>{value.icon}</div>
          <div className='flex-col justify-start items-start gap-2 flex'>
            <h2 className='text-xl font-medium'>{value.name}</h2>
            <p className='text-white text-sm'>{value.condition}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BrandValues;
