import { Routes, Route } from 'react-router-dom';

import Layout from '../layout/layout.component';
import RequireAuth from '../components/require-auth.component';

import Dashboard from '../pages/dashboard.page';

import AdminUsers from '../pages/admin-users.page';

import AdminCustomers from '../pages/admin-customers.page';

import AdminProducts from '../pages/admin-products.page';
import AdminProductDetails from '../pages/admin-product-details';
import AddProduct from '../pages/add-product';
import EditProduct from '../pages/edit-product';

import AdminOrders from '../pages/orders/admin-orders.page';
import AdminOrderDetails from '../pages/orders/admin-order-detail.page';
import AdminProfile from '../pages/admin-profile.page';

const DashboardRoutes = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route element={<RequireAuth allowedRoles={['admin', 'manager']} />}>
          <Route index path='dashboard' element={<Dashboard />} />
          <Route path='profile' element={<AdminProfile />} />
          <Route path='users' element={<AdminUsers />} />
          <Route path='customers' element={<AdminCustomers />} />

          <Route path='orders'>
            <Route index element={<AdminOrders />} />
            <Route path=':orderId' element={<AdminOrderDetails />} />
          </Route>

          <Route path='products'>
            <Route index element={<AdminProducts />} />
            <Route path=':id' element={<AdminProductDetails />} />
            <Route path='add' element={<AddProduct />} />
            <Route path='edit/:id' element={<EditProduct />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
};

export default DashboardRoutes;
