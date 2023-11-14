import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminLogin from '@/pages/admin-login.page';
import DashboardRoutes from './dashboard.route';

const ConfigRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path='/admin/login' element={<AdminLogin />} />
        <Route path='/admin/*' element={<DashboardRoutes />} />
      </Routes>
    </Router>
  );
};

export default ConfigRoutes;
