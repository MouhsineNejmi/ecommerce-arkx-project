import { Outlet } from 'react-router-dom';

const ProtectedRoutes: React.FC = () => {
  return <Outlet />;
  // return condition ? <Outlet /> : <Navigate to='/admin' />;
};

export default ProtectedRoutes;
