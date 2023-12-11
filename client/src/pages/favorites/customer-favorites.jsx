import { useSelector } from 'react-redux';
import ProductCard from '../../components/products/product-card.component';
import { favoritesSelector } from '../../app/features/favorties.slice';

const CustomerFavorites = () => {
  const favorites = useSelector(favoritesSelector);

  console.log(favorites);

  return (
    <div className='grid grid-cols-4 gap-4'>
      {favorites.map((favorite) => (
        <ProductCard key={favorite._id} product={favorite} />
      ))}
    </div>
  );
};

export default CustomerFavorites;
