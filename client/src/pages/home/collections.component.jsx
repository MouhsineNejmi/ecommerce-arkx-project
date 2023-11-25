import CollectionCard from '../../components/collection-card.component';

const Collections = () => {
  return (
    <div className='custom-container py-10'>
      <h3 className='text-center mb-10 font-bold text-3xl'>Our Collections</h3>

      <div className='grid grid-cols-4 gap-4'>
        <CollectionCard />
        <CollectionCard />
        <CollectionCard />
        <CollectionCard />
      </div>
    </div>
  );
};

export default Collections;
