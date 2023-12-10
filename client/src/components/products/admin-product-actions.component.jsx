/* eslint-disable react/prop-types */
import React from 'react';

import { Button } from '../../components/ui/button';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid';
import { EyeIcon } from '@heroicons/react/24/outline';

import { useToast } from '@/components/ui/use-toast';

import { useDeleteProductMutation } from '../../app/api/products.api';

import { Link } from 'react-router-dom';

const AdminProductAction = ({ productId }) => {
  const { toast } = useToast();

  const [deleteProduct, { isLoading, error, isSuccess, isError }] =
    useDeleteProductMutation();

  React.useEffect(() => {
    if (isSuccess) {
      toast.success('Product deleted successfully');
    }

    if (isError) {
      if (Array.isArray(error.data.error)) {
        error.data.error.forEach((el) =>
          toast.error(el.message, {
            position: 'top-right',
          })
        );
      } else {
        toast.error(error.data.message, {
          position: 'top-right',
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  const handleDeleteProduct = async (id) => {
    await deleteProduct(id);
  };

  return (
    <div className='flex gap-2 mt-4'>
      <Link to={`/admin/products/${productId}`}>
        <Button className='group p-3 border-gold hover:bg-gold'>
          <EyeIcon className='text-gold w-4 h-4 group group-hover:text-white' />
        </Button>
      </Link>
      <Link to={`/admin/products/edit/${productId}`}>
        <Button className='group p-3 border-gold hover:bg-gold'>
          <PencilIcon className='text-gold w-4 h-4 group group-hover:text-white' />
        </Button>
      </Link>

      <Button
        onClick={handleDeleteProduct}
        className='group p-3 bg-transparent text-red-500 border border-red-500 hover:bg-red-500'
      >
        <TrashIcon className='w-4 h-4 group group-hover:text-white' />
      </Button>
    </div>
  );
};

export default AdminProductAction;
