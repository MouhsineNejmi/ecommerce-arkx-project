import ProductCard from './product-card.component';

const ProductItems = () => {
  const product = {
    category: 'Interior Design',
    image:
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1916&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    price: '$12',
    title: 'Product Title',
    description: 'Product Description',
  };

  return (
    <div className='grid grid-cols-4 gap-4 p-4 mb-4'>
      <ProductCard product={product} />
      <ProductCard product={product} />
      <ProductCard product={product} />
      <ProductCard product={product} />
    </div>
  );
};

export default ProductItems;
