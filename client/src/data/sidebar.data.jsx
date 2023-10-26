import { TiFlashOutline } from 'react-icons/ti';
import { AiOutlineUser } from 'react-icons/ai';
import { HiOutlineBuildingStorefront } from 'react-icons/hi2';

const sidebarData = [
  {
    name: 'Dashboard',
    icon: <TiFlashOutline size={18} />,
    link: '/admin',
  },
  {
    name: 'Users',
    icon: <AiOutlineUser size={18} />,
    link: '/admin/users',
  },
  {
    name: 'Products',
    icon: <HiOutlineBuildingStorefront size={18} />,
    link: '/admin/products',
  },
];

export default sidebarData;
