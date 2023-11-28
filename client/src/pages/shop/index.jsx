import { products } from '../../data/products';

import ProductItems from '../../components/products/product-items.component';
import CategoriesList from '../../components/categories-list.component';
import ShopHero from './shop-hero.component';
import TriggerView from '../../components/trigger-view.component';

const ShopPage = () => {
  return (
    <>
      <ShopHero />
      <div className='custom-container flex gap-8'>
        <CategoriesList />
        <div className='w-full mb-20'>
          <div className='mb-4 flex justify-between'>
            <h3 className='text-2xl font-semibold'>All</h3>
            <TriggerView />
          </div>
          <ProductItems products={products} showActions={true} />
        </div>
      </div>
    </>
  );
};

export default ShopPage;
