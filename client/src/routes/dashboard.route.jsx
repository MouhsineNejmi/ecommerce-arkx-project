import { Routes, Route } from 'react-router-dom';
import Layout from '../layout/layout.component';
import RequireAuth from '../components/require-auth.component';
import Dashboard from '../pages/dashboard.page';
import AdminUsers from '../pages/admin-users.page';
import AdminCustomers from '../pages/admin-customers.page';
import AdminSellers from '../pages/admin-sellers.page';

const DashboardRoutes = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route element={<RequireAuth allowedRoles={['admin', 'manager']} />}>
          <Route index path='/dashboard' element={<Dashboard />} />
          <Route index path='users' element={<AdminUsers />} />
          <Route index path='customers' element={<AdminCustomers />} />
          <Route index path='sellers' element={<AdminSellers />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default DashboardRoutes;
