/* eslint-disable react/prop-types */
import { Outlet } from 'react-router-dom';
import DiscountBar from './discount-bar.component';
import StoreNavbar from './store-navbar.component';
import StoreFooter from './store-footer.component';

const StoreLayout = () => {
  return (
    <>
      <DiscountBar />
      <StoreNavbar />
      <main>
        <Outlet />
      </main>
      <StoreFooter />
    </>
  );
};

export default StoreLayout;
