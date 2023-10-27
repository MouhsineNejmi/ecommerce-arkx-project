import { DashboardIcon, PersonIcon } from '@radix-ui/react-icons';
import { Store } from 'lucide-react';

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
  },
  {
    name: 'Products',
    icon: <Store size={14} strokeWidth={2} />,
    link: '/admin/products',
  },
];

export default sidebarData;
