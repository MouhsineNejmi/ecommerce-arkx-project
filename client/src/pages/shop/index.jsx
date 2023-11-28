import { products } from '../../data/products';

import ProductItems from '../../components/products/product-items.component';
import FilterList from '../../components/filter-list.component';
import ShopHero from './shop-hero.component';
import TriggerView from '../../components/trigger-view.component';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  ArrowLongUpIcon,
  ArrowLongDownIcon,
} from '@heroicons/react/24/outline';

const ShopPage = () => {
  return (
    <div className='custom-container mb-20'>
      <ShopHero />

      <div className='flex items-center justify-between gap-2 mb-6'>
        <FilterList />
        <div className='flex items-center gap-8'>
          <Select>
            <SelectTrigger className='w-40'>
              <SelectValue placeholder='Sort By' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='asc'>
                <div className='w-full flex items-center gap-2'>
                  <ArrowLongUpIcon className='w-4 h-4' />
                  <p>Asc</p>
                </div>
              </SelectItem>
              <SelectItem value='desc'>
                <div className='w-full flex items-center gap-2'>
                  <ArrowLongDownIcon className='w-4 h-4' />
                  <p>Desc</p>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>

          <TriggerView />
        </div>
      </div>

      <ProductItems products={products} showActions={true} />
      {/* <div className='mb-4 flex flex-col justify-between'>
      </div> */}
    </div>
  );
};

export default ShopPage;
