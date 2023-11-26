import { Link } from 'react-router-dom';

const PromotionBanner = () => {
  return (
    <div className='w-full flex'>
      <div className='w-1/2'>
        <img
          src='https://mir-s3-cdn-cf.behance.net/project_modules/fs/919ce286589849.5d9e06ac97b8b.jpg'
          alt='Hero Section'
          className=' h-full bg-cover bg-center'
        />
      </div>
      <div className='w-1/2 flex flex-col gap-4 justify-center pl-10 bg-[#f3f5f7]'>
        <h4 className='uppercase font-semibold text-gold'>
          Save up to 30% off
        </h4>
        <h2 className='uppercase font-bold text-2xl max-w-md'>
          Hunder of new pieces with modern designs.
        </h2>
        <Link
          to='/shop'
          className='underline font-semibold text-gold hover:text-light-gold'
        >
          Shop Now
        </Link>
      </div>
    </div>
  );
};

export default PromotionBanner;
