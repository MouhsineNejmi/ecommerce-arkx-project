import { Link, useParams } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Parser from 'html-react-parser';

import { useGetProductByIdQuery } from '../../app/api/products.api';
import { Loader2, Star } from 'lucide-react';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

const AdminProductDetails = () => {
  const { productId } = useParams();

  const {
    data: product,
    isLoading,
    isFetching,
    isError,
    error,
  } = useGetProductByIdQuery(productId);

  console.log(product);

  const loading = isLoading || isFetching;

  if (loading) {
    return <Loader2 />;
  }

  if (isError) {
    console.error(error);
  }

  return (
    <div className='p-4'>
      <Link
        to='/admin/products'
        className='flex items-center gap-2 underline text-zinc-500 mb-4'
      >
        <ArrowLeftIcon className='w-4 h-4' />
        Go back
      </Link>
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
        </div>
      </div>
    </div>
  );
};

export default AdminProductDetails;
