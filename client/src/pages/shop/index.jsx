import React from 'react';
import { Loader2 } from 'lucide-react';

import { useGetAllProductsQuery } from '../../app/api/products.api';
import { useGetAllCategoriesQuery } from '../../app/api/categories.api';

import ProductItems from '../../components/products/product-items.component';
import ShopHero from './shop-hero.component';
import ToggleView from '../../components/toggle-view.component';
import FilterProduct from '../../components/products/filter-product.component';
import filterProducts from '../../lib/filterProducts';

const ShopPage = () => {
  const { data: products, isLoading } = useGetAllProductsQuery();
  const { data: categories, isLoading: isLoadingCategories } =
    useGetAllCategoriesQuery();

  React.useEffect(() => {
    setFilteredProducts(products);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  const [toggleView, setToggleView] = React.useState(false);
  const [filteredProducts, setFilteredProducts] = React.useState(products);

  const handleToggle = (value) => setToggleView(value);
  const handleFilterChange = ({ category, search, priceRange }) => {
    const updatedProducts = filterProducts(
      products,
      category,
      search,
      priceRange
    );
    setFilteredProducts(updatedProducts);
  };

  return isLoading ? (
    <Loader2 className='animate-spin' />
  ) : (
    <div className='custom-container mb-20'>
      <ShopHero />

      <div className='flex flex-col gap-8'>
        <div>
          <div className='flex justify-between items-center mb-6 gap-2 w-full'>
            {!isLoadingCategories && (
              <FilterProduct
                categories={categories}
                onFilterChange={handleFilterChange}
              />
            )}

            <div className='flex items-center gap-4'>
              <h4 className='font-semibold text-sm'>Products View:</h4>
              <ToggleView
                toggleView={toggleView}
                setToggleView={handleToggle}
              />
            </div>
          </div>

          <div>
            {filteredProducts && (
              <ProductItems
                products={filteredProducts}
                showActions={true}
                showDetails={toggleView}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
