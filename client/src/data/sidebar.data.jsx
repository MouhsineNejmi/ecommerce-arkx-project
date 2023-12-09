import {
  BuildingStorefrontIcon,
  CreditCardIcon,
  SquaresPlusIcon,
  TagIcon,
  UserGroupIcon,
  UsersIcon,
} from '@heroicons/react/24/outline';

const sidebarData = [
  {
    name: 'Dashboard',
    icon: <SquaresPlusIcon className='w-5 h-5' />,
    link: '/admin/dashboard',
  },
  {
    name: 'Users',
    icon: <UsersIcon className='w-5 h-5' />,
    link: '/admin/users',
  },
  {
    name: 'Customers',
    icon: <UserGroupIcon className='w-5 h-5' />,
    link: '/admin/customers',
  },
  {
    name: 'Products',
    icon: <BuildingStorefrontIcon className='w-5 h-5' />,
    link: '/admin/products',
    isParent: false,
  },
  {
    name: 'Orders',
    icon: <TagIcon className='w-5 h-5' />,
    link: '/admin/orders',
    isParent: false,
  },
  {
    name: 'Payment',
    icon: <CreditCardIcon className='w-5 h-5' />,
    link: '/admin/payment',
  },
];

export default sidebarData;
