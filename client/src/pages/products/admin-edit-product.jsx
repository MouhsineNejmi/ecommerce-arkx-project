/* eslint-disable react/prop-types */
import { Link, useParams } from 'react-router-dom';
import { ArrowLeftIcon } from 'lucide-react';

import AdminProductForm from '../../components/products/admin-product-form.component';

import { useGetProductByIdQuery } from '../../app/api/products.api';

const AdminEditProduct = () => {
  const { productId } = useParams();
  const { data: product, isLoading: isLoaidngProduct } =
    useGetProductByIdQuery(productId);

  return (
    <div>
      <Link
        to='/admin/products'
        className='flex items-center gap-2 underline text-zinc-500 mb-4'
      >
        <ArrowLeftIcon className='w-4 h-4' />
        Go back
      </Link>

      <h2 className='mb-4 font-bold text-2xl'>Edit Product</h2>

      {!isLoaidngProduct && <AdminProductForm product={product} />}
    </div>
  );
};

export default AdminEditProduct;
