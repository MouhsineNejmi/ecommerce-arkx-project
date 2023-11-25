/* eslint-disable react/prop-types */
import { cn } from '../../lib/utils';

import { StarIcon } from '@heroicons/react/24/solid';
import { HeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconFilled } from '@heroicons/react/24/solid';

import { Button } from '../ui/button';

const ProductCard = ({ product, showDetails }) => {
  return (
    <div className='relative flex flex-col group'>
      <div className='relative w-[250px] overflow-hidden rounded-md'>
        <div className='absolute w-full h-full bg-black opacity-30 hidden z-10 group-hover:block' />
        <img
          src={product.image}
          alt={product.name}
          className={cn('w-full object-cover rounded-md h-96 hover:scale-105')}
        />
      </div>

      <div className='space-y-1 text-sm mt-4'>
        <div className='flex mb-2'>
          {[1, 2, 3, 4, 5].map((index) => (
            <StarIcon key={index} className='w-4 h-4' />
          ))}
        </div>
        <h3 className='font-semibold text-md leading-none pb-1'>
          {product.name}
        </h3>
        <p className='text-xs text-dark-gray'>{product.price}</p>
      </div>

      {/* Actions */}
      <div className='hidden z-20 group-hover:block'>
        <div className='absolute right-2 top-2 bg-white p-2 rounded-full cursor-pointer'>
          <HeartIcon className='w-6 h-6' />
          <HeartIconFilled className='w-6 h-6 text-red-500 hidden' />
        </div>
        <div className='w-full flex justify-center absolute bottom-24'>
          <Button className='w-full h-12 mx-4'>Add To Cart</Button>
        </div>
      </div>

      {/* Additional information for 2 columns layout */}
      {showDetails && (
        <div className='hidden'>
          <p className='mb-2'>{product.title}</p>
          <p className='mb-2'>{product.description}</p>
          <button className='bg-blue-500 text-white px-4 py-2 mb-2 md:mb-0'>
            Add to Cart
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
