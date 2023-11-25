import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className='custom-container relative h-[650px] overflow-hidden flex'>
      <div className='absolute max-w-2xl h-full left-20 flex flex-col justify-center z-10 text-shadow'>
        <h1 className='font-bold text-[50px] text-violet-700 pb-6'>
          Design your dream home with modern interior design
        </h1>
        <Link to='/shop' className='font-medium underline text-xl'>
          Discover More &rarr;
        </Link>
      </div>

      <div className='w-full h-full relative overflow-hidden rounded-2xl'>
        <div className='w-[80%] h-full absolute rounded-2xl right-0 z-10 bg-black opacity-20' />
        <img
          src='https://images.unsplash.com/photo-1537726235470-8504e3beef77?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
          alt='Hero Section'
          className='w-[80%] h-full rounded-2xl translate-x-1/4 bg-contain bg-center'
        />
      </div>
    </div>
  );
};

export default Hero;
