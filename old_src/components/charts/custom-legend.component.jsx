/* eslint-disable react/prop-types */
import { cn } from '../../lib/utils';

const CustomLegend = ({ className, legend }) => {
  return (
    <ul className='flex-items-center'>
      <li className='flex items-center gap-2 text-xs'>
        <span className={cn('w-3 h-3 block rounded-sm', className)}></span>
        {legend}
      </li>
    </ul>
  );
};

export default CustomLegend;
