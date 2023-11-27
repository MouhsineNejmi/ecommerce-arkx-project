import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoutes from './protected.routes';
import Dashboard from '../pages/dashboard.page';
import Productcard from '../pages/products.page';
//import AddProduct from '../pages/addProduct.page';


const ConfigRoutes = () => {
  return (
    <Router>
      <Routes>
   
      <Route path='/list' element={<Productcard />} />
        <Route path='admin' element={<ProtectedRoutes />}>
          <Route index element={<Dashboard />} />

         
          </Route>
      </Routes>
    </Router>
  );
};

export default ConfigRoutes;
//<Route path='/add' element={<AddProduct />} />
