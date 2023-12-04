/* eslint-disable react/prop-types */
// import { useFilter } from '../../context/FilterProvider';
import { Loader2 } from 'lucide-react';
import { AdjustmentsVerticalIcon } from '@heroicons/react/24/outline';

import { useGetAllCategoriesQuery } from '../../app/api/categories.api';

import { cn } from '../../lib/utils';
import { Checkbox } from '../ui/checkbox';

const Filters = ({ className }) => {
  const { data: categories, isLoading } = useGetAllCategoriesQuery();

  // const { categoriesFilters, setCategoryFilters, sort, setSort } = useFilter();
  // const handleCategories = (categoryId) => {};

  return isLoading ? (
    <Loader2 />
  ) : (
    <div className={cn(className)}>
      <div className='flex items-center gap-2 mb-10'>
        <AdjustmentsVerticalIcon className='w-7 h-7' />
        <h4 className='font-semibold text-lg'>Products Filter</h4>
      </div>

      <div className='mb-10'>
        <h3 className='font-semibold'>Product Categories</h3>
        <div className='w-full flex flex-col gap-4 mt-6'>
          {categories &&
            categories.map((category) => {
              {
                /* let isSelected = false; */
              }

              return (
                <div
                  key={category._id}
                  className='flex items-center justify-between'
                >
                  <label
                    htmlFor={category.name}
                    className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                  >
                    {category.name}
                  </label>
                  <Checkbox id={category.name} />
                </div>
              );
            })}
        </div>
      </div>

      <div>
        <h3 className='font-semibold'>Sort By</h3>
        <div className='w-full flex flex-col gap-4 mt-6'>
          <div className='flex items-center justify-between'>
            <label
              htmlFor='asc'
              className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
            >
              Ascending Order
            </label>
            <Checkbox id='asc' />
          </div>

          <div className='flex items-center justify-between'>
            <label
              htmlFor='desc'
              className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
            >
              Descending Order
            </label>
            <Checkbox id='desc' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filters;
