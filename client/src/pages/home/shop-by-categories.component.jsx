import { Loader2 } from 'lucide-react';
import { useGetAllCategoriesQuery } from '../../app/api/categories.api';
import CategoryCard from '../../components/category-card.component';

const ShopByCategories = () => {
  const { data: categories, isLoading } = useGetAllCategoriesQuery();

  return isLoading ? (
    <Loader2 />
  ) : (
    <div className='flex flex-col items-center justify-center py-20'>
      <h2 className='text-3xl font-bold mb-10'>Shop By Category</h2>
      <div className='flex flex-wrap justify-center gap-8 p-8'>
        {categories.map((category) => (
          <CategoryCard key={category.name} category={category} />
        ))}
      </div>
    </div>
  );
};

export default ShopByCategories;
