import { Link } from 'react-router-dom';
import AdminProductForm from '../../components/products/admin-product-form.component';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';

const AdminAddProduct = () => {
  return (
    <div className='p-4'>
      <Link
        to='/admin/products'
        className='flex items-center gap-2 underline text-zinc-500 mb-4'
      >
        <ArrowLeftIcon className='w-4 h-4' />
        Go back
      </Link>

      <h2 className='text-2xl font-bold capitalize pb-2'>Add Product</h2>

      <AdminProductForm />
    </div>
  );
};

export default AdminAddProduct;
