import { bool } from 'prop-types';
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';

const MenuIcon = ({ expanded }) => {
  return <>{expanded ? <ChevronLeftIcon /> : <ChevronRightIcon />}</>;
};

MenuIcon.propTypes = {
  expanded: bool.isRequired,
};

export default MenuIcon;
