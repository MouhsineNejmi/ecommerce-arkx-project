/* eslint-disable react/prop-types */
import { StarIcon } from '@heroicons/react/24/solid';
import { HeartIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';

import { sliceText } from '../../helpers/sliceText';

import { Button } from '../ui/button';

const ProductCardMobile = ({ product }) => {
  return (
    <div className={'relative flex shadow-lg rounded-md'}>
      <div className='relative w-1/2 h-[300px] overflow-hidden group rounded-md'>
        <div className='absolute w-full h-full bg-black opacity-30 hidden z-10 group-hover:block' />
        <img
          src={product.product_images[0]}
          alt={product.name}
          className='w-full h-full bg-center bg-no-repeat bg-cover h-96 group-hover:scale-105'
        />
      </div>

      <div className='flex flex-col items-center w-1/2 px-4 text-sm mt-4'>
        <div>
          <div className='flex mb-2'>
            {[1, 2, 3, 4, 5].map((index) => (
              <StarIcon key={index} className='w-4 h-4 text-gold' />
            ))}
          </div>
          <h3 className='font-semibold text-lg leading-none pb-1'>
            {product.product_name}
          </h3>
          <p className='text-sm text-dark-gray'>${product.price}</p>
          <p className='text-sm mt-2'>
            {sliceText(product.short_description, 86)}
          </p>
        </div>

        <div className='w-full flex flex-col gap-2 mt-4'>
          <Button className='h-10 bg-transparent gap-2 text-black border border-red-500 text-red-500 transition-all duration-300 hover:text-white hover:bg-red-500'>
            <HeartIcon className='w-6 h-6' />
            Add To Favorites
          </Button>

          <Button className='h-10 bg-gold gap-2 hover:bg-light-gold dark:text-white'>
            <ShoppingCartIcon className='w-6 h-6' />
            Add To Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCardMobile;
