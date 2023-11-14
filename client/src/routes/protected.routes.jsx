import { Outlet } from 'react-router-dom';

const ProtectedRoutes = () => {
  return <Outlet />;
  // return condition ? <Outlet /> : <Navigate to='/admin' />;
};

export default ProtectedRoutes;
