import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoutes from '@/routes/protected.routes';
import Dashboard from '@/pages/dashboard.page';

const ConfigRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path='admin' element={<ProtectedRoutes />}>
          <Route index element={<Dashboard />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default ConfigRoutes;
