/* eslint-disable react/prop-types */
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';

const MenuIcon = ({ expanded }) => {
  return <>{expanded ? <ChevronLeftIcon /> : <ChevronRightIcon />}</>;
};

export default MenuIcon;
