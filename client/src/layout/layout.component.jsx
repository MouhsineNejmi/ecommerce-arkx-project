import { Outlet } from 'react-router-dom';
import { Toaster } from '../components/ui/toaster';
import Sidebar from './sidebar.component';
import Navbar from './navbar.component';

const Layout = () => {
  return (
    <div className='flex'>
      <Sidebar />
      <main className='w-full'>
        <Navbar />
        <div className='p-4'>
          <Outlet />
        </div>
        <Toaster />
      </main>
    </div>
  );
};

export default Layout;
