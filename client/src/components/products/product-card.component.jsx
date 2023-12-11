/* eslint-disable react/prop-types */
import { useEffect } from 'react';
import { useToast } from '../ui/use-toast';
import { useAddToCartMutation } from '../../app/api/cart.api';

import { StarIcon } from '@heroicons/react/24/solid';
import { HeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconFilled } from '@heroicons/react/24/solid';

import { Button } from '../ui/button';
import { Loader2 } from 'lucide-react';
import { useDispatch } from 'react-redux';

import { addProductToCart } from '../../app/features/cart.slice';
import {
  addProductToFavorites,
  removeProductFromFavorites,
} from '../../app/features/favorties.slice';
import {
  useAddToFavoritesMutation,
  useDeleteFromFavoritesMutation,
} from '../../app/api/favorites.api';

const ProductCard = ({
  product,
  isFavorite = false,
  showActions = true,
  extended = false,
}) => {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const [addToCart, { isLoading: isAddingProductToCart, isSuccess }] =
    useAddToCartMutation();

  const [addToFavorites] = useAddToFavoritesMutation();
  const [deleteFromFavorites] = useDeleteFromFavoritesMutation();

  useEffect(() => {
    if (isSuccess) {
      toast({ title: 'Product added to cart successfully!' });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  const handleAddToCart = async (product) => {
    dispatch(addProductToCart(product));
    await addToCart(product._id);
    toast({ title: 'Product added to cart successfully!' });
  };

  const handleAddToFavorites = async () => {
    dispatch(addProductToFavorites(product));
    await addToFavorites(product._id);
    toast({ title: 'Product added to favorites successfully!' });
  };

  const handleRemoveFrromFavorites = async () => {
    dispatch(removeProductFromFavorites(product));
    await deleteFromFavorites(product._id);
    toast({ title: 'Product removed from favorites successfully!' });
  };

  return (
    product && (
      <div
        className={`relative flex flex-col ${
          !extended ? 'flex-1' : 'w-[250px]'
        } group`}
      >
        <div className='relative w-full h-[300px] overflow-hidden rounded-md cursor-pointer'>
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
              {!isFavorite ? (
                <HeartIcon className='w-6 h-6' onClick={handleAddToFavorites} />
              ) : (
                <HeartIconFilled
                  className='w-6 h-6 text-red-500'
                  onClick={handleRemoveFrromFavorites}
                />
              )}
            </div>
            <div className='w-full flex justify-center absolute bottom-24'>
              <Button
                className='w-full h-12 mx-4 bg-gold dark:text-white'
                disabled={isAddingProductToCart}
                onClick={() => handleAddToCart(product)}
              >
                {isAddingProductToCart && <Loader2 className='animte-spin' />}
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
