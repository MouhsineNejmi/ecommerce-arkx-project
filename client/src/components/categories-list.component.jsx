import { ScrollArea } from './ui/scroll-area';

import { Checkbox } from './ui/checkbox';
import { AdjustmentsVerticalIcon } from '@heroicons/react/24/outline';

const categories = ['All', 'Living Room', 'Bedroom', 'Kitchen'];
const prices_range = [
  'All Prices',
  '$0-99$',
  '$100-$399',
  '$400-699',
  '$700-$1000',
];

const CategoriesList = () => {
  return (
    <div className='w-[200px]'>
      <div className='flex items-center gap-2 mb-10'>
        <AdjustmentsVerticalIcon className='w-6 h-6' />
        <h2 className='text-2xl font-semibold'>Filters</h2>
      </div>
      <div className='pb-3'>
        <h2 className='font-poppins text-lg font-semibold mb-4'>Categories</h2>
        <ScrollArea className='h-72 rounded-md'>
          <ul className='h-full flex flex-col gap-2 max-w-xs overflow-y-auto'>
            {categories.map((category, index) => (
              <li
                key={index}
                className='text-md cursor-pointer font-poppins dark:text-white hover:text-black hover:font-semibold hover:bg-gray-100 rounded-lg focus:border-[2px] focus:ring focus:ring-violet-300 hover:underline decoration-black'
              >
                {category}
              </li>
            ))}
          </ul>
        </ScrollArea>
      </div>

      <div>
        <h2 className='font-poppins font-semibold text-lg mb-4'>
          Filter By Prices
        </h2>
        <div>
          <ul className='max-w-sm flex flex-col'>
            {prices_range.map((range, index) => (
              <li
                key={index}
                className='inline-flex items-center gap-x-1 py-2 text-md font-poppins bg-white text-gray-800'
              >
                <div className='relative flex items-center w-full'>
                  <label
                    htmlFor='hs-list-group-item-checkbox-1'
                    className='block w-full text-md text-gray-600 hover:text-gold'
                  >
                    {range}
                  </label>
                  {/* <input
                    id='hs-list-group-item-checkbox-1'
                    name='hs-list-group-item-checkbox-1'
                    type='checkbox'
                    className='border-gray-200 disabled:opacity-50'
                  /> */}
                  <Checkbox />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CategoriesList;
