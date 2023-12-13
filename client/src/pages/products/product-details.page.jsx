import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Parser from 'html-react-parser';
import { Loader2, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { HeartIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { useGetProductByIdQuery } from '../../app/api/products.api';
import { addProductToCart } from '../../app/features/cart.slice';
import { addProductToFavorites } from '../../app/features/favorties.slice';
import { useAddToFavoritesMutation } from '../../app/api/favorites.api';
import { useGetMyProfileDataQuery } from '../../app/api/users.api';
import { useAddToCartMutation } from '../../app/api/cart.api';
import { useToast } from '../../components/ui/use-toast';
import { Button } from '../../components/ui/button';

const ProductDetails = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const { toast } = useToast();

  const { data: user, isLoadingUserData } = useGetMyProfileDataQuery();
  const [addToCart, { isLoading: isAddingProductToCart }] =
    useAddToCartMutation();

  const [addToFavorites, { isLoading: isAddingProductToFavorites }] =
    useAddToFavoritesMutation();

  const {
    data: product,
    isLoading,
    isFetching,
    isError,
    error,
  } = useGetProductByIdQuery(productId);

  const loading = isLoading || isFetching;

  if (loading) {
    return <Loader2 />;
  }

  if (isError) {
    console.error(error);
  }

  const handleAddToCart = async (product) => {
    if (isLoading || (!isLoading && !user)) {
      toast({
        title: 'You must be logged in, in order to add product to cart!',
        variant: 'destructive',
      });
      return;
    }
    dispatch(addProductToCart(product));
    await addToCart(product._id);
    toast({ title: 'Product added to cart successfully!' });
  };

  const handleAddToFavorites = async () => {
    if (isLoading || (!isLoadingUserData && !user)) {
      toast({
        title: 'You must be logged in, in order to add product to favorites!',
        variant: 'destructive',
      });
      return;
    }
    dispatch(addProductToFavorites(product));
    await addToFavorites(product._id);
    toast({ title: 'Product added to favorites successfully!' });
  };

  return (
    <div className='my-20 p-4'>
      <div className='flex justify-center gap-10'>
        <div className='w-1/2 overflow-hidden rounded-md'>
          <img
            src={product?.product_images[0]}
            alt={product.product_name}
            className={cn(
              'h-[400px] w-full object-cover transition-all hover:scale-105',
              'aspect-square'
            )}
          />
        </div>
        <div className='w-1/2'>
          <div className='space-y-1 text-sm'>
            <div className='flex justify-between items-center'>
              <p className='text-sm text-muted-foreground text-slate-500 dark:text-slate-300'>
                {product.category_id.category_name}
              </p>
            </div>

            <h3 className='text-2xl py-2 w-4/5 font-bold leading-7'>
              {product.product_name}
            </h3>
            <p className='text-slate-500 py-2 leading-6 dark:text-slate-300'>
              {product.short_description}
            </p>

            <div className='flex items-center justify-between py-2'>
              <div className='flex items-center gap-2'>
                <p className='text-2xl font-semibold capitalize'>Price:</p>
                <p className='text-3xl font-bold'>${product.price}</p>
              </div>
              <div className='flex items-center gap-1'>
                <p className='text-slate-500 dark:text-slate-300 pt-[1px]'>
                  4.8
                </p>
                <Star strokeWidth={0} fill='orange' size={20} />
              </div>
            </div>

            <div className='flex py-2 gap-6'>
              <div className='flex items-center gap-2'>
                <p className='text-slate-700 dark:text-slate-300'>Quantity:</p>
                <p className='text-slate-400'>{product.quantity}</p>
              </div>
            </div>

            <div className='flex items-center gap-4 py-2'>
              <p className='text-slate-700 dark:text-slate-300'>Colors:</p>

              <Select>
                <SelectTrigger className='w-[250px] text-slate-400 dark:border-slate-200'>
                  <SelectValue placeholder='Choose options' />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {product.options.map((option) => (
                      <SelectItem key={option} value={option}>
                        {Parser(option)}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className='py-2'>
              <p className='text-slate-700 dark:text-slate-300'>Description:</p>
              <p className='pt-3 leading-6 dark:text-slate-300'>
                {product.long_description}
              </p>
            </div>
          </div>

          <div className='w-full flex gap-2 mt-4'>
            <Button
              className='h-10 bg-transparent gap-2 text-black border border-red-500 text-red-500 transition-all duration-300 hover:text-white hover:bg-red-500'
              disabled={isAddingProductToFavorites}
              onClick={handleAddToFavorites}
            >
              <HeartIcon className='w-6 h-6' />
              Add To Favorites
            </Button>

            <Button
              className='h-10 bg-gold gap-2 hover:bg-light-gold dark:text-white'
              disabled={isAddingProductToCart}
              onClick={() => handleAddToCart(product)}
            >
              {isAddingProductToCart && <Loader2 className='animte-spin' />}
              <ShoppingCartIcon className='w-6 h-6' />
              Add To Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
