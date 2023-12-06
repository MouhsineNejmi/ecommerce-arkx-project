import { Routes, Route } from 'react-router-dom';

import StoreLayout from '../layout/store/store-layout.component';

import Home from '../pages/home';
import AccountProfile from '../pages/profile/customer-profile.page';
import ShopPage from '../pages/shop';
import CheckoutPage from '../pages/checkout';

const StoreRoutes = () => {
  return (
    <Routes>
      <Route element={<StoreLayout />}>
        <Route path='/' element={<Home />} />
        <Route path='profile' element={<AccountProfile />} />
        <Route path='shop' element={<ShopPage />} />
        <Route path='checkout' element={<CheckoutPage />} />
      </Route>
    </Routes>
  );
};

export default StoreRoutes;
