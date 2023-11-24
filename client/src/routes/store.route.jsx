import { Routes, Route } from 'react-router-dom';

import StoreLayout from '../layout/store/store-layout.component';

import Home from '../pages/home.page';
import AccountProfile from '../pages/profile/customer-profile.page';

const StoreRoutes = () => {
  return (
    <Routes>
      <Route element={<StoreLayout />}>
        <Route path='/' element={<Home />} />
        <Route path='profile' element={<AccountProfile />} />
      </Route>
    </Routes>
  );
};

export default StoreRoutes;
