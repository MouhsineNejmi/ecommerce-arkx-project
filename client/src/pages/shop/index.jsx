import { products } from '../../data/products';

import ProductItems from '../../components/products/product-items.component';
import ShopHero from './shop-hero.component';
import TriggerView from '../../components/trigger-view.component';

import Filters from '../../components/products/filters.component';

const ShopPage = () => {
  return (
    <div className='custom-container mb-20'>
      <ShopHero />

      <div className='flex gap-8'>
        <Filters />
        <div>
          <div className='flex justify-between items-center'>
            <TriggerView />
          </div>
          <ProductItems products={products} showActions={true} />
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
