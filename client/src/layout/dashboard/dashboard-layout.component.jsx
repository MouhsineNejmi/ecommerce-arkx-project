import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import DashboardSidebar from './dashboard-sidebar.component';
import DashboardNavbar from './dashboard-navbar.component';

const DashboardLayout = () => {
  const [expanded, setExpanded] = useState(true);
  const toggleExpand = () => setExpanded((prev) => !prev);

  return (
    <div className='flex'>
      <DashboardSidebar expanded={expanded} toggleExpand={toggleExpand} />
      <main className={`${expanded ? 'ml-52' : 'ml-20'} w-full`}>
        <DashboardNavbar />
        <div className='p-4'>
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
