import CategoryCard from '../../components/category-card.component';

const categories = [
  {
    name: 'Chairs',
    img: 'https://plus.unsplash.com/premium_photo-1678559033839-aaf50cb4c843?q=80&w=1856&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    link: 'shop/chairs',
  },
  {
    name: 'Lamps',
    img: 'https://images.unsplash.com/photo-1556702571-3e11dd2b1a92?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    link: 'shop/lambs',
  },
  {
    name: 'Sofa',
    img: 'https://images.unsplash.com/photo-1519961655809-34fa156820ff?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    link: 'shop/sofa',
  },
  {
    name: 'Interior Design',
    img: 'https://images.unsplash.com/photo-1537726235470-8504e3beef77?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    link: 'shop/interior-design',
  },
];

const ShopByCategories = () => {
  return (
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
