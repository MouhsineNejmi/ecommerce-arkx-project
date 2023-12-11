import { useSelector } from 'react-redux';
import { Loader2 } from 'lucide-react';

import { useGetAllFavoritesQuery } from '../../app/api/favorites.api';
import { favoritesSelector } from '../../app/features/favorties.slice';
import ProductCard from '../../components/products/product-card.component';

const FavoritesPage = () => {
  const { isLoading } = useGetAllFavoritesQuery();
  const favorites = useSelector(favoritesSelector);

  return isLoading ? (
    <Loader2 className='animate-spin' />
  ) : favorites.length !== 0 ? (
    <div className='custom-container min-h-screen'>
      <h1 className='text-center font-bold text-2xl my-16'>
        Your Favorite Products
      </h1>
      <div className='grid grid-cols-4 gap-4'>
        {favorites.map((favorite) => (
          <ProductCard
            key={favorite._id}
            isFavorite={true}
            product={favorite}
          />
        ))}
      </div>
    </div>
  ) : (
    <div className='min-h-screen flex flex-col justify-center items-center'>
      <h1 className='font-bold text-2xl'>You have no favorites productts!</h1>
    </div>
  );
};

export default FavoritesPage;
