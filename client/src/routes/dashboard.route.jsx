import { Routes, Route } from 'react-router-dom';

import Layout from '../layout/layout.component';
import RequireAuth from '../components/require-auth.component';

import Dashboard from '../pages/dashboard.page';
import AdminUsers from '../pages/admin-users.page';
import AdminCustomers from '../pages/admin-customers.page';
import AdminSellers from '../pages/admin-sellers.page';
import AdminUserEdit from '../pages/admin-user-edit.page';
import AdminAddUser from '../pages/admin-add-user.page';

const DashboardRoutes = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route element={<RequireAuth allowedRoles={['admin', 'manager']} />}>
          <Route index path='dashboard' element={<Dashboard />} />
          <Route path='users'>
            <Route index element={<AdminUsers />} />
            <Route path='add' element={<AdminAddUser />} />
            <Route path='edit/:userId' element={<AdminUserEdit />} />
          </Route>
          <Route path='customers' element={<AdminCustomers />} />
          <Route path='sellers' element={<AdminSellers />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default DashboardRoutes;
