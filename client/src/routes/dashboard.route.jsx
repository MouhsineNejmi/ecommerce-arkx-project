import { Routes, Route } from 'react-router-dom';

import Layout from '../layout/layout.component';
import RequireAuth from '../components/require-auth.component';

import Dashboard from '../pages/dashboard.page';

import AdminUsers from '../pages/users/admin-users.page';
import AdminAddUser from '../pages/users/admin-add-user.page';
import AdminEditUser from '../pages/users/admin-edit-user.page';

import AdminCustomers from '../pages/customers/admin-customers.page';
import AdminAddCustomer from '../pages/customers/admin-add-customer.page';
import AdminEditCustomer from '../pages/customers/admin-edit-customer.page';

import AdminSellers from '../pages/admin-sellers.page';

import AdminOrders from '../pages/orders/admin-orders.page';
import AdminOrderDetails from '../pages/orders/admin-order-detail.page';

const DashboardRoutes = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route element={<RequireAuth allowedRoles={['admin', 'manager']} />}>
          <Route index path='dashboard' element={<Dashboard />} />
          <Route path='users'>
            <Route index element={<AdminUsers />} />
            <Route path='add' element={<AdminAddUser />} />
            <Route path='edit/:userId' element={<AdminEditUser />} />
          </Route>
          <Route path='customers'>
            <Route index element={<AdminCustomers />} />
            <Route path='add' element={<AdminAddCustomer />} />
            <Route path='edit/:customerId' element={<AdminEditCustomer />} />
          </Route>
          <Route path='sellers' element={<AdminSellers />} />
          <Route path='orders'>
            <Route index element={<AdminOrders />} />
            <Route path=':orderId' element={<AdminOrderDetails />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
};

export default DashboardRoutes;
