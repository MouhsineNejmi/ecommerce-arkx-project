import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';

interface MenuIconProps {
  expanded: boolean;
}

const MenuIcon: React.FC<MenuIconProps> = ({ expanded }) => {
  return <>{expanded ? <ChevronLeftIcon /> : <ChevronRightIcon />}</>;
};

export default MenuIcon;
