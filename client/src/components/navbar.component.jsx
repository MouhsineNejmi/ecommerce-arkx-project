import Toggle from './toggle/toggle.component';

const Navbar = () => {
  return (
    <div className='border-b'>
      <div className='flex items-center'>
        <h3 className=''>37</h3>
        <div>
          <h4 className='text-[12px] font-medium'>Orders</h4>
          <span>Last 7 days</span>
        </div>
      </div>

      <Toggle />
    </div>
  );
};

export default Navbar;
