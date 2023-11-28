import Breadcrumb from '../../components/shared/bread-crumb.component';

const ShopHero = () => {
  return (
    <div className='relative h-[600px] mb-10'>
      <div className='relative h-full w-full overflow-hidden'>
        <div className='absolute w-full h-full bg-black opacity-50 rounded-lg' />
        <img
          src='https://mir-s3-cdn-cf.behance.net/project_modules/fs/c8c4b9185011535.655c82b14dc00.jpg'
          alt='Shop Page'
          className='w-full h-full bg-contain bg-center rounded-lg'
        />
      </div>

      <div className='absolute top-0 right-0 w-full h-full flex flex-col justify-center items-center'>
        <Breadcrumb className={'text-white'} />
        <h2 className='text-white font-bold text-4xl mb-4'>Shop Page</h2>
        <h2 className='text-white text-2xl'>
          Let&apos;s Design the place you always imagined.
        </h2>
      </div>
    </div>
  );
};

export default ShopHero;
