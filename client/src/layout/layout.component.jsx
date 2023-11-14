import { Outlet } from 'react-router-dom';
import { Toaster } from '../components/ui/toaster';
import Sidebar from '../components/sidebar.component';
import Navbar from './navbar.component';

const Layout = () => {
  return (
    <div className='flex'>
      <Sidebar />
      <main className='w-full'>
        <Navbar />
        <Outlet />
        <Toaster />
      </main>
    </div>
  );
};

export default Layout;
