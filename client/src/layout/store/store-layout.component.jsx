/* eslint-disable react/prop-types */
import { Outlet } from 'react-router-dom';
import DiscountBar from './discount-bar.component';
import StoreNavbar from './store-navbar.component';

const StoreLayout = () => {
  return (
    <>
      <DiscountBar />
      <StoreNavbar />
      <main className='px-20'>
        <Outlet />
      </main>
    </>
  );
};

export default StoreLayout;
