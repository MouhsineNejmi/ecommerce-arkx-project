/* eslint-disable react/prop-types */
import ProductCard from './product-card.component';

const ProductItems = ({ products, limit }) => {
  const limitedProducts = limit ? products.slice(0, limit) : products;

  return (
    <div className='grid grid-cols-4 gap-4'>
      {limitedProducts.map((product, index) => (
        <ProductCard key={index} product={product} />
      ))}
    </div>
  );
};

export default ProductItems;
