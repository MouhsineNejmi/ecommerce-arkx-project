/* eslint-disable react/prop-types */
import ProductCard from '../../components/store-products/product-card.component';

import { ScrollArea, ScrollBar } from '../../components/ui/scroll-area';

const JustIn = ({ products }) => {
  return (
    <div className='my-10 pl-20'>
      <h1 className='text-2xl font-semibold mb-4'>Just In</h1>
      <div className='relative'>
        <ScrollArea>
          <div className='flex gap-4'>
            {products.map((product, index) => (
              <ProductCard key={index} product={product} showDetails={false} />
            ))}
            <ScrollBar orientation='horizontal' />
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default JustIn;
