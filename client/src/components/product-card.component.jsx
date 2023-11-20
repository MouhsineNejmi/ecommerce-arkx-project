import PropTypes from 'prop-types';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { calculateDiscountedPrice } from '../helpers/calculateDiscountedPrice';
import { sliceText } from '../helpers/sliceText';

const ProductCard = ({ product }) => {
  console.log(product);

  return (
    <Link to={`/admin/products/${product._id}`}>
      <div className='flex items-center justify-between'>
        <div>
          <h2 className='font-bold text-xl'>
            {sliceText(product.product_name, 16)}
          </h2>
        </div>
        <div className='rounded-full'>
          <span className='capitalize text-slate-400'>
            {product.subcategory_id.subcategory_name}
          </span>
        </div>
      </div>

      {/* Product Image */}
      <div className='py-2 overflow-hidden rounded-md'>
        <img
          src={
            !product.product_image
              ? product.product_image
              : 'https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=1408&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
          }
          alt={product.product_name}
          className={cn(
            'rounded-md h-72 w-full object-cover transition-all transform hover:scale-105',
            'aspect-[3/4]'
          )}
        />
      </div>

      <div className='flex items-center justify-between'>
        <div className='space-y-1 text-sm'>
          <p className='text-xs text-muted-foreground'>
            {calculateDiscountedPrice(
              Number(product.price),
              Number(product.discount_price)
            ) === Number(product.price)
              ? null
              : 'Original Price'}
          </p>
          <h3 className='font-semibold leading-none'>
            {product.subcategory_id.subcategory_name}
          </h3>
        </div>
        <div className='space-y-1 text-sm'>
          <p className='text-xs text-muted-foreground'>
            {calculateDiscountedPrice(
              Number(product.price),
              Number(product.discount_price)
            ) === Number(product.price)
              ? null
              : Number(product.price)}
          </p>
          <h3 className='font-semibold leading-none'>
            $
            {calculateDiscountedPrice(
              Number(product.price),
              Number(product.discount_price)
            )}
          </h3>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;

ProductCard.propTypes = {
  product: PropTypes.object,
};
