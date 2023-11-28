/* eslint-disable react/prop-types */
import ProductCard from '../../components/products/product-card.component';

import { ScrollArea, ScrollBar } from '../../components/ui/scroll-area';

const NewArrival = ({ products }) => {
  return (
    <div className='py-20 pl-20'>
      <h2 className='text-center mb-10 font-bold text-3xl'>New Arrival</h2>

      <div className='relative'>
        <ScrollArea>
          <div className='flex gap-4'>
            {products.map((product, index) => (
              <ProductCard
                key={index}
                product={product}
                extended={true}
                showDetails={false}
              />
            ))}
            <ScrollBar orientation='horizontal' />
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default NewArrival;
