import PropTypes from 'prop-types';
import { Pencil, Trash2 } from 'lucide-react';
import React from 'react';
import { useToast } from '@/components/ui/use-toast';

import { useDeleteProductMutation } from '../app/api/products.api';
import { Link } from 'react-router-dom';

const AdminProductAction = ({ productId }) => {
  const { toast } = useToast();

  const [deletePost, { isLoading, error, isSuccess, isError }] =
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

  const onDeleteHandler = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      deletePost(id);
    }
  };

  return (
    <div className='flex gap-2'>
      <Link to={`/admin/products/edit/${productId}`}>
        <Pencil size={16} className='text-green-500 cursor-pointer' />
      </Link>

      <Trash2
        size={16}
        className='text-red-500 cursor-pointer'
        onClick={() => onDeleteHandler(productId)}
      />
    </div>
  );
};

export default AdminProductAction;

AdminProductAction.propTypes = {
  productId: PropTypes.string,
};
