import { useState } from 'react';
import ModeToggle from './mode-toggle';
import UserDropDownMenu from './user-dropdown-menu.component';

const Navbar = () => {
  const [preview, setPreview] = useState(false);
  const togglePage = () => setPreview((prev) => !prev);

  return (
    <div className='border-b p-5 flex justify-between items-center'>
      <div className='flex items-center gap-2'>
        <h3 className='font-bold text-xl font-open'>37</h3>
        <span className='border-r w-[1px] rounded-sm h-6 bg-light-gray'></span>
        <div className='font-medium text-xs'>
          <h4 className='text-[12px]'>Orders</h4>
          <span className='text-dark-gray'>Last 7 days</span>
        </div>
      </div>

      <div
        className='relative w-44 h-12 flex p-[1px] bg-light-gray rounded-full overflow-hidden text-black'
        onClick={togglePage}
      >
        <button
          className={`h-full w-1/2 rounded-full text-xs text-[11px] font-medium z-10 tracking-tight ${
            !preview ? 'dark:text-white' : ''
          }`}
        >
          Dashboard
        </button>
        <span
          style={{ transition: 'all .4s' }}
          className={`w-1/2 h-[95%] bg-background z-0 absolute top-2/4 -translate-y-2/4 rounded-full shadow-2xl ${
            preview ? 'right-px' : 'left-px'
          }`}
        ></span>
        <button
          className={`h-full h-full w-1/2 rounded-full text-[11px] font-medium z-10 tracking-tight ${
            preview ? 'dark:text-white' : ''
          }`}
        >
          Website
        </button>
      </div>

      <div className='flex justify-end items-center gap-4'>
        <ModeToggle />
        <UserDropDownMenu />
      </div>
    </div>
  );
};

export default Navbar;
