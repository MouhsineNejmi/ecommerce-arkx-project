/* eslint-disable react/prop-types */
import ProductItems from '../../components/store-products/product-items.component';

const BestSelling = ({ products }) => {
  return (
    <div className='custom-container py-20'>
      <h3 className='font-bold text-3xl text-center mb-8'>Best Selling</h3>
      <ProductItems products={products} limit={8} />
    </div>
  );
};

export default BestSelling;
