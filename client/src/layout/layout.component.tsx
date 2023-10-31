import Sidebar from '@/components/sidebar/sidebar.component';
import Navbar from '@/components/navbar.component';

interface Props {
  children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div className='flex'>
      <Sidebar />
      <main className='w-full'>
        <Navbar />
        <div className='p-4'>{children}</div>
      </main>
    </div>
  );
};

export default Layout;
