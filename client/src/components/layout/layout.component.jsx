import { ReactNode } from 'react';
import Sidebar from '../sidebar/sidebar.component';
import Navbar from '../navbar/navbar.component';

const Layout = ({ children }) => {
  return (
    <>
      <div>
        <Sidebar />
        <Navbar />
      </div>
      <main>{children}</main>
    </>
  );
};

Layout.propTypes = {
  children: ReactNode,
};

export default Layout;
