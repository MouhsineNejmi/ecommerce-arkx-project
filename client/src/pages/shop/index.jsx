import React from 'react';
import { Loader2 } from 'lucide-react';

import { useGetAllProductsQuery } from '../../app/api/products.api';

import ProductItems from '../../components/products/product-items.component';
import ShopHero from './shop-hero.component';
import ToggleView from '../../components/toggle-view.component';
import Filters from '../../components/products/filters.component';

const ShopPage = () => {
  const { data: products, isLoading } = useGetAllProductsQuery();

  const [toggleView, setToggleView] = React.useState(false);
  const handleToggle = (value) => setToggleView(value);

  return isLoading ? (
    <Loader2 className='animate-spin' />
  ) : (
    <div className='custom-container mb-20'>
      <ShopHero />

      <div className='flex gap-8'>
        <Filters className='w-52' />

        <div className='w-[calc(100%-13rem)]'>
          <div className='flex justify-end items-center mb-6 gap-2 w-full'>
            <h4 className='font-semibold text-sm'>Layout:</h4>
            <ToggleView toggleView={toggleView} setToggleView={handleToggle} />
          </div>

          <div>
            {products && (
              <ProductItems
                products={products}
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
