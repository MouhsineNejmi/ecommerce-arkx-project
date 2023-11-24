/* eslint-disable react/prop-types */

const ProductCard = ({ product, aspectRatio }) => {
  return (
    <div className='flex flex-col'>
      <div className='overflow-hidden rounded-md'>
        <img
          src={product.image}
          alt={product.title}
          className={`col-span-4 w-full h-96 object-cover transition-all hover:scale-105 ${
            aspectRatio === 'portrait' ? 'aspect-[3/4]' : 'aspect-square'
          }`}
        />
      </div>

      <p className='mb-2'>{product.category}</p>
      <p className='mb-2'>{product.price}</p>

      {/* Additional information for 2 columns layout */}
      <div className='hidden'>
        <p className='mb-2'>{product.title}</p>
        <p className='mb-2'>{product.description}</p>
        <button className='bg-blue-500 text-white px-4 py-2 mb-2 md:mb-0'>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
