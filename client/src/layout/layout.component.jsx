import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Toaster } from '../components/ui/toaster';
import Sidebar from './sidebar.component';
import Navbar from './navbar.component';

const Layout = () => {
  const [expanded, setExpanded] = useState(true);

  const toggleExpand = () => setExpanded((prev) => !prev);

  return (
    <div className='flex'>
      <Sidebar expanded={expanded} toggleExpand={toggleExpand} />
      <main className={`${expanded ? 'ml-52' : 'ml-20'} w-full`}>
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
