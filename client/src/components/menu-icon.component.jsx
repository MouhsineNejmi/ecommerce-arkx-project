import { bool } from 'prop-types';
import { BsChevronBarLeft, BsChevronBarRight } from 'react-icons/bs';

const MenuIcon = ({ expanded }) => {
  return (
    <>
      {expanded ? (
        <BsChevronBarLeft size={20} />
      ) : (
        <BsChevronBarRight size={20} />
      )}
    </>
  );
};

MenuIcon.propTypes = {
  expanded: bool,
};

export default MenuIcon;
