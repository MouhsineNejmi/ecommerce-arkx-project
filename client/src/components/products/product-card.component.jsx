/* eslint-disable react/prop-types */
import { StarIcon } from '@heroicons/react/24/solid';
import { HeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconFilled } from '@heroicons/react/24/solid';

import { Button } from '../ui/button';
import { useAddToCartMutation } from '../../app/api/cart';
import { useEffect } from 'react';
import { useToast } from '../ui/use-toast';

const ProductCard = ({ product, showActions = true, extended = false }) => {
  const { toast } = useToast();
  const [addToCart, { isSuccess }] = useAddToCartMutation();

  useEffect(() => {
    if (isSuccess) {
      toast({ title: 'Product added to cart successfully!' });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  return (
    product && (
      <div
        className={`relative flex flex-col ${
          !extended ? 'flex-1' : 'w-[250px]'
        } group`}
      >
        <div className='relative w-full h-[300px] overflow-hidden rounded-md'>
          <div className='absolute w-full h-full bg-black opacity-30 hidden z-10 group-hover:block' />
          <img
            src={product.product_images[0]}
            alt={product.product_name}
            className='w-full h-full bg-center bg-no-repeat bg-cover rounded-md h-96 group-hover:scale-105'
          />
        </div>

        <div className='space-y-1 text-sm mt-4'>
          <div className='flex mb-2'>
            {[1, 2, 3, 4, 5].map((index) => (
              <StarIcon key={index} className='w-4 h-4 text-gold' />
            ))}
          </div>
          <h3 className='font-semibold text-md leading-none pb-1'>
            {product.product_name}
          </h3>
          <p className='text-xs text-dark-gray'>${product.price}</p>
        </div>

        {/* Actions */}
        {showActions && (
          <div className='hidden z-20 group-hover:block'>
            <div className='absolute right-2 top-2 bg-background p-2 rounded-full cursor-pointer'>
              <HeartIcon className='w-6 h-6' />
              <HeartIconFilled className='w-6 h-6 text-red-500 hidden' />
            </div>
            <div className='w-full flex justify-center absolute bottom-24'>
              <Button
                className='w-full h-12 mx-4 bg-gold dark:text-white'
                onClick={() => addToCart(product._id)}
              >
                Add To Cart
              </Button>
            </div>
          </div>
        )}
      </div>
    )
  );
};

export default ProductCard;
