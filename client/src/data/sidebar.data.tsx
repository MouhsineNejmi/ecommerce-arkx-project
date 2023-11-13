import { DashboardIcon, PersonIcon } from '@radix-ui/react-icons';
import { Store, Tags } from 'lucide-react';

const sidebarData = [
  {
    name: 'Dashboard',
    icon: <DashboardIcon />,
    link: '/admin',
  },
  {
    name: 'Users',
    icon: <PersonIcon />,
    link: '/admin/users',
    // sub_menu: [],
  },
  {
    name: 'Products',
    icon: <Store size={14} strokeWidth={2} />,
    link: '/admin/products',
  },
  {
    name: 'Orders',
    icon: <Tags size={14} strokeWidth={2} />,
    link: '/admin/orders',
  },
];

export default sidebarData;
