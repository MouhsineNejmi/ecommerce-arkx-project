import { any } from 'prop-types';
import Sidebar from '../components/sidebar.component';
import Navbar from '../components/navbar.component';

const Layout = ({ children }) => {
  return (
    <>
      <Sidebar />
      <Navbar />
      <main>{children}</main>
    </>
  );
};

Layout.propTypes = {
  children: any,
};

export default Layout;
