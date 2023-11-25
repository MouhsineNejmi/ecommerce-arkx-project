import { Link } from 'react-router-dom';

const CollectionCard = () => {
  return (
    <div className='h-[450px] relative rounded-lg overflow-hidden'>
      <div className='w-full h-full left-0 top-0 absolute flex-col justify-center items-center inline-flex'>
        <div className='w-full h-full bg-gradient-to-t from-purple-500 to-pink-500' />
      </div>
      <div className='left-6 bottom-12 absolute flex flex-col gap-2'>
        <h3 className='text-white text-2xl font-bold font-poppins'>
          November Outfits
        </h3>
        <Link className='text-white underline text-md font-open'>
          Collection
        </Link>
      </div>
    </div>
  );
};

export default CollectionCard;
