import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminLogin from '@/pages/admin-login.page';
import DashboardRoutes from './dashboard.route';
import Unauthorized from '../pages/unauthorized.page';
import AccountProfile from '../pages/profile/customer-profile.page';

const ConfigRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path='/admin/login' element={<AdminLogin />} />
        <Route path='/admin/*' element={<DashboardRoutes />} />
        <Route path='/unauthorized' element={<Unauthorized />} />
        <Route path='/profile'>
          <Route index element={<AccountProfile />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default ConfigRoutes;
