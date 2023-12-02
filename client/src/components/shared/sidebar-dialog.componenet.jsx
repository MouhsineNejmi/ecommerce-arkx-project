/* eslint-disable react/prop-types */
import { useState } from 'react';
import { X } from 'lucide-react';

import { Separator } from '../ui/separator';
import { Badge } from '../ui/badge';

const SidebarDialog = ({ id, children }) => {
  const [open, setOpen] = useState(false);
  const handleOpenDialog = () => setOpen(!open);

  return (
    <>
      <Badge
        className='font-medium cursor-pointer'
        variant={'outline'}
        onClick={handleOpenDialog}
      >
        {id}
      </Badge>

      <div
        className={`${
          open ? 'fixed' : 'hidden'
        } right-0 top-0 w-screen h-screen flex z-10`}
      >
        <div
          className='w-9/12 bg-black opacity-20'
          onClick={handleOpenDialog}
        />
        <div className='w-3/12 bg-background py-6'>
          <div className='flex justify-between items-center mb-4 px-4'>
            <h1 className='font-bold text-xl'>User Preview</h1>
            <X
              className='cursor-pointer'
              size={16}
              onClick={handleOpenDialog}
            />
          </div>
          <Separator className='bg-slate-300 mb-4' />
          <div className='px-4'>{children}</div>
        </div>
      </div>
    </>
  );
};

export default SidebarDialog;
