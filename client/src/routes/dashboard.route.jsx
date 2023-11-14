import { Routes, Route } from 'react-router-dom';
import Dashboard from '../pages/dashboard.page';
import AdminUsers from '../pages/admin-users.page';
import Layout from '../layout/layout.component';
import RequireAuth from '../components/require-auth.component';

const DashboardRoutes = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route element={<RequireAuth allowedRoles={['admin', 'manager']} />}>
          <Route index path='/dashboard' element={<Dashboard />} />
          <Route path='users' element={<AdminUsers />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default DashboardRoutes;
