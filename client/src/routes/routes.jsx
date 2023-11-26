import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import AdminLogin from '@/pages/admin-login.page';
import Unauthorized from '../pages/unauthorized.page';

import DashboardRoutes from './dashboard.route';
import StoreRoutes from './store.route';

import AuthPage from '../pages/auth';

const ConfigRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path='/admin/login' element={<AdminLogin />} />
        <Route path='unauthorized' element={<Unauthorized />} />
        <Route path='/admin/*' element={<DashboardRoutes />} />
        <Route path='/*' element={<StoreRoutes />} />
        <Route path='auth' element={<AuthPage />} />
      </Routes>
    </Router>
  );
};

export default ConfigRoutes;
