import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoutes from './protected.routes';
import Login from '../pages/login.page';
// import Header from '../components/navBar/header';
import LandingPage from '../pages/landingPage/home.page'

const ConfigRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path='/admin/login' element={<Login />} />
        <Route path='admin' element={<ProtectedRoutes />}>
        </Route>
        <Route path='/home' element={<LandingPage/>} />
      </Routes>
    </Router>
  );
};

export default ConfigRoutes;
