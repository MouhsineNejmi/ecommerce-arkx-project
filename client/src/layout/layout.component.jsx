import { any } from 'prop-types';
import Sidebar from '../components/sidebar.component';
import Navbar from '../components/navbar.component';

const Layout = ({ children }) => {
  return (
    <div className='flex'>
      <Sidebar />
      <main className='w-full'>
        <Navbar />
        {children}
      </main>
    </div>
  );
};

Layout.propTypes = {
  children: any,
};

export default Layout;
