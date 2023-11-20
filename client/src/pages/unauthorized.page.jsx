import { Link } from 'react-router-dom';

const Unauthorized = () => {
  return (
    <div className='flex flex-col gap-4 items-center justify-center h-screen'>
      <h1 className='font-bold text-2xl'>Unauthorized</h1>
      <p className='font-medium text-md text-dark-gray'>
        To visit the dashboard you must be{' '}
        <span className='text-main-1'>admin</span> or{' '}
        <span className='text-main-1'>manager</span>.
      </p>
      <Link to='/admin/login' className='underline'>
        Go to Login &rarr;
      </Link>
    </div>
  );
};

export default Unauthorized;
