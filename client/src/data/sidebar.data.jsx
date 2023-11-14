import { DashboardIcon, PersonIcon } from '@radix-ui/react-icons';
import { Store, Tags } from 'lucide-react';

const sidebarData = [
  {
    name: 'Dashboard',
    icon: <DashboardIcon />,
    link: '/admin/dashboard',
    isParent: false,
  },
  {
    name: 'Users',
    icon: <PersonIcon />,
    isParent: true,
    sub_menu: [
      {
        name: 'Users',
        icon: <PersonIcon />,
        link: '/admin/users',
      },
      {
        name: 'Customers',
        icon: <PersonIcon />,
        link: '/admin/customers',
      },
      {
        name: 'Sellers',
        icon: <PersonIcon />,
        link: '/admin/sellers',
      },
    ],
  },
  {
    name: 'Products',
    icon: <Store size={14} strokeWidth={2} />,
    link: '/admin/products',
    isParent: false,
  },
  {
    name: 'Orders',
    icon: <Tags size={14} strokeWidth={2} />,
    link: '/admin/orders',
    isParent: false,
  },
];

export default sidebarData;
