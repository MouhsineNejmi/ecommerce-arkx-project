import { Link } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

import SearchProduct from '../../components/products/search-product.component';
import SelectProduct from '../../components/products/select-product.component';
import ProductCard from '../../components/products/product-card.component';

import { useGetAllProductsQuery } from '../../app/api/products.api';

import AdminProductAction from '../../components/products/admin-product-actions.component';

const AdminProducts = () => {
  const {
    data: products,
    isLoading,
    isFetching,
    isError,
    error,
  } = useGetAllProductsQuery();

  const loading = isLoading || isFetching;

  if (loading) {
    return <Loader2 />;
  }

  if (isError) {
    console.error(error);
  }

  return (
    <div className='p-4'>
      <div className='header'>
        <div className='flex justify-between items-center'>
          <div className='flex items-center gap-3'>
            <SearchProduct />
            <SelectProduct />
          </div>

          {/* Add Product Button */}
          <Link
            to='/admin/products/add'
            className='bg-gold p-2 rounded-md text-white hover:bg-light-gold px-4'
          >
            Add Products
          </Link>
        </div>
      </div>

      <div className='pt-6 grid gap-4 grid-flow-row grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
        {products.map((product) => (
          <div key={product._id} className='cursor-pointer'>
            <ProductCard showActions={false} product={product} />
            <AdminProductAction productId={product._id} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminProducts;
