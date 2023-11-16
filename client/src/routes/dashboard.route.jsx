import { Routes, Route } from 'react-router-dom';
import Dashboard from '../pages/dashboard.page';
import AdminUsers from '../pages/admin-users.page';
import Layout from '../layout/layout.component';
import RequireAuth from '../components/require-auth.component';
import AdminOrders from '../pages/admin-orders.page';
import AdminProducts from '../pages/admin-products.page';
import AdminProductDetails from '../pages/admin-product-details';
import AddProduct from '../pages/add-product';
import EditProduct from '../pages/edit-product';

const DashboardRoutes = () => {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route
                    element={
                        <RequireAuth allowedRoles={['admin', 'manager']} />
                    }
                >
                    <Route index path='/dashboard' element={<Dashboard />} />
                    <Route path='users' element={<AdminUsers />} />
                    <Route path='orders' element={<AdminOrders />} />
                    <Route path='products' element={<AdminProducts />} />
                    <Route
                        path='product/:id'
                        element={<AdminProductDetails />}
                    />
                    <Route path='product/add' element={<AddProduct />} />
                    <Route path='product/edit/:id' element={<EditProduct />} />
                </Route>
            </Route>
        </Routes>
    );
};

export default DashboardRoutes;
