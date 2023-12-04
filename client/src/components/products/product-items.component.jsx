/* eslint-disable react/prop-types */
import ProductCardMobile from './product-card-mobile.component';
import ProductCard from './product-card.component';

const ProductItems = ({ products, limit, showActions, showDetails }) => {
  const limitedProducts = limit ? products.slice(0, limit) : products;

  return (
    <div
      className={`grid ${
        showDetails ? 'grid-cols-2' : 'grid-cols-4'
      } gap-4 w-full`}
    >
      {limitedProducts.map((product, index) =>
        !showDetails ? (
          <ProductCard key={index} product={product} showAction={showActions} />
        ) : (
          <ProductCardMobile key={index} product={product} />
        )
      )}
    </div>
  );
};

export default ProductItems;
