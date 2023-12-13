import { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

import ProductCard from '../../components/products/product-card.component';
import AdminProductAction from '../../components/products/admin-product-actions.component';
import FilterProduct from '../../components/products/filter-product.component';

import { useGetAllProductsQuery } from '../../app/api/products.api';
import { useGetAllCategoriesQuery } from '../../app/api/categories.api';

import filterProducts from '../../lib/filterProducts';

const AdminProducts = () => {
  const {
    data: products,
    isLoading,
    isFetching,
    isError,
    error,
  } = useGetAllProductsQuery();
  const { data: categories, isLoading: isLoadingCategories } =
    useGetAllCategoriesQuery();

  const [filteredProducts, setFilteredProducts] = useState(products);

  const loading = isLoading || isFetching;

  useEffect(() => {
    setFilteredProducts(products);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  if (loading) {
    return <Loader2 />;
  }

  if (isError) {
    console.error(error);
  }

  const handleFilterChange = ({ category, search }) => {
    const updatedProducts = filterProducts(products, category, search);
    console.log(updatedProducts);
    setFilteredProducts(updatedProducts);
  };

  return (
    <div className='p-4'>
      <div className='header'>
        <div className='flex justify-between items-center'>
          <div className='flex items-center gap-3'>
            {!isLoadingCategories && (
              <FilterProduct
                categories={categories}
                onFilterChange={handleFilterChange}
              />
            )}
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
        {filterProducts &&
          filteredProducts?.map((product) => (
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
