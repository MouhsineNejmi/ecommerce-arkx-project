import { Routes, Route } from 'react-router-dom';

import StoreLayout from '../layout/store/store-layout.component';
import ProfileLayout from '../components/profile/profile-layout';

import Home from '../pages/home';
import AccountProfile from '../pages/profile/customer-profile.page';
import ShopPage from '../pages/shop';
import CheckoutPage from '../pages/checkout';
import CustomerOrders from '../pages/orders/customer-orders.page';
import FavoritesPage from '../pages/favorites';

const StoreRoutes = () => {
  return (
    <Routes>
      <Route element={<StoreLayout />}>
        <Route path='/' element={<Home />} />
        <Route path='profile' element={<ProfileLayout />}>
          <Route index element={<AccountProfile />} />
          <Route path='orders' element={<CustomerOrders />} />
          <Route path='favorites' element={<FavoritesPage />} />
        </Route>
        <Route path='checkout' element={<CheckoutPage />} />
        <Route path='shop' element={<ShopPage />} />
      </Route>
    </Routes>
  );
};

export default StoreRoutes;
