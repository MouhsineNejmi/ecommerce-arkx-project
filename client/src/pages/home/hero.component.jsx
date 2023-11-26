import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className='custom-container relative flex w-full h-[600px] overflow-hidden'>
      <div className='w-[40%] h-full left-20 flex flex-col justify-center gap-4 z-20'>
        <p className='text-lg text-zinc-500'>
          Transform and Redesign Your Home
        </p>
        <h1 className='max-w-2xl text-foreground font-bold text-[50px]'>
          Your{' '}
          <span className='text-[50px] bg-gold px-1 rounded-lg text-white'>
            Dream Home
          </span>{' '}
          Start Right Here
        </h1>
        <Link
          to='/shop'
          className='border border-white w-max py-4 px-8 w-40 bg-gold transition-all duration-300 hover:bg-light-dark hover:scale-105 text-white font-semibold text-md rounded-full'
        >
          Shop Now
        </Link>
      </div>

      <div className='w-[60%] h-full overflow-hidden rounded-2xl'>
        <img
          src='https://mir-s3-cdn-cf.behance.net/project_modules/fs/35799a131274935.61922fce67c1d.jpg'
          // src='https://mir-s3-cdn-cf.behance.net/project_modules/fs/919ce286589849.5d9e06ac97b8b.jpg'
          alt='Hero Section'
          className=' h-full rounded-2xl bg-cover bg-center'
        />
      </div>
    </div>
  );
};

export default Hero;
