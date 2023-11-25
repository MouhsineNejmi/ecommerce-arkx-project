/* eslint-disable react/prop-types */
import ProductCard from './test/product-card.component';

import { ScrollArea, ScrollBar } from './ui/scroll-area';

const products = [
  {
    image:
      'https://images.unsplash.com/photo-1592078615290-033ee584e267?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    name: '96 Nuptse Dip Dye Korea Puffers Jacket',
    price: '$400',
  },
  {
    image:
      'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    name: 'Paradigm Chilliwack Black Label Jacket',
    price: '$349.99',
  },
  {
    image:
      'https://plus.unsplash.com/premium_photo-1688125414656-ab91164cbd1e?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    name: '1996 Retro Nuptse Jacket in Black',
    price: '$349.99',
  },
  {
    image:
      'https://plus.unsplash.com/premium_photo-1681980019667-96baeb36fc33?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    name: 'Paul Quilted Nylon Puffer bomber jacket',
    price: '$349.99',
  },
  {
    image:
      'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    name: 'Paradigm Chilliwack Black Label Jacket',
    price: '$349.99',
  },
  {
    image:
      'https://images.unsplash.com/photo-1540932239986-30128078f3c5?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    name: 'Chilliwack jacket Bomber HUMANATURE',
    price: '$349.99',
  },
];

const JustIn = () => {
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
