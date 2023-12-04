/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';

const CategoryCard = ({ category }) => {
  return (
    <Link className='flex flex-col items-center gap-4' to='/shop'>
      <div className='w-40 h-40 bg-indigo-500 rounded-full overflow-hidden'>
        <img
          src={category.category_image}
          alt={category.name}
          className='w-full h-full bg-cover bg-center bg-norepeat'
        />
      </div>
      <h3 className='text-md font-semibold'>{category.name}</h3>
    </Link>
  );
};

export default CategoryCard;
