import { useParams } from 'react-router-dom';
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
import AdminProductAction from '../../components/products/admin-product-actions.component';

const AdminProductDetails = () => {
  const { id } = useParams();

  const {
    data: product,
    isLoading,
    isFetching,
    isError,
    error,
  } = useGetProductByIdQuery(id);

  const loading = isLoading || isFetching;

  if (loading) {
    return <Loader2 />;
  }

  if (isError) {
    console.error(error);
  }

  return (
    <div className='p-4'>
      <div className='flex justify-center gap-20'>
        <div className='w-2/5 overflow-hidden rounded-md'>
          <img
            src={
              !product.product_image
                ? product.product_image
                : 'https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=1408&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            }
            alt={product.product_name}
            className={cn(
              'h-[400px] w-full object-cover transition-all hover:scale-105',
              'aspect-square'
            )}
          />
        </div>
        <div className='w-2/5'>
          <div className='space-y-1 text-sm'>
            <div className='flex justify-between items-center'>
              <p className='text-sm text-muted-foreground text-slate-500 dark:text-slate-300'>
                {product.subcategory_id.subcategory_name}
              </p>
              <AdminProductAction productId={product._id} />
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
                <p className='text-slate-700 dark:text-slate-300'>
                  Select Size:
                </p>
                <Select>
                  <SelectTrigger className='w-[180px] text-slate-400 dark:border-slate-200'>
                    <SelectValue placeholder='Choose size' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value='apple'>Apple</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className='flex items-center gap-2'>
                <p className='text-slate-700 dark:text-slate-300'>Quantity:</p>
                <p className='text-slate-400'>{product.quantity}</p>
              </div>
            </div>

            <div className='flex items-center gap-4 py-2'>
              <p className='text-slate-700 dark:text-slate-300'>Options:</p>

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
