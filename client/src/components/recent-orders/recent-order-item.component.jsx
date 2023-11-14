import ProductImg from '@/assets/product-test.jpeg';

const RecentOrderItem = () => {
  return (
    <div className='pt-4 flex justify-between items-center mb-2'>
      <div className='flex gap-2'>
        <img src={ProductImg} alt='Product Item 1' className='w-10 h-10' />
        <div>
          <h3 className='text-sm font-semibold'>Channel Perfume</h3>
          <p className='text-xs text-dark-gray'>Just now</p>
        </div>
      </div>
      <h4 className='text-dark-gray font-bold'>$259</h4>
    </div>
  );
};

export default RecentOrderItem;
