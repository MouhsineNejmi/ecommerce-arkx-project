import Hero from './hero.component';
import NewArrival from './new-arrival.component';
import ShopByCategories from './shop-by-categories.component';
import Collections from './collections.component';
import BestSelling from './best-selling.component';
import BrandValues from './brand-values.component';
import PromotionBanner from './promotion-banner.component';
import { useSelector } from 'react-redux';

const products = [
  {
    image:
      'https://images.unsplash.com/photo-1592078615290-033ee584e267?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    name: '96 Nuptse Dip Dye Korea Puffers Jacket',
    price: '$400',
  },
  {
    image:
      'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    name: 'Paradigm Chilliwack Black Label Jacket',
    price: '$349.99',
  },
  {
    image:
      'https://plus.unsplash.com/premium_photo-1688125414656-ab91164cbd1e?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    name: '1996 Retro Nuptse Jacket in Black',
    price: '$349.99',
  },
  {
    image:
      'https://plus.unsplash.com/premium_photo-1681980019667-96baeb36fc33?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    name: 'Paul Quilted Nylon Puffer bomber jacket',
    price: '$349.99',
  },
  {
    image:
      'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    name: 'Paradigm Chilliwack Black Label Jacket',
    price: '$349.99',
  },
  {
    image:
      'https://images.unsplash.com/photo-1540932239986-30128078f3c5?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    name: 'Chilliwack jacket Bomber HUMANATURE',
    price: '$349.99',
  },
  {
    image:
      'https://images.unsplash.com/photo-1540932239986-30128078f3c5?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    name: 'Chilliwack jacket Bomber HUMANATURE',
    price: '$349.99',
  },
  {
    image:
      'https://images.unsplash.com/photo-1540932239986-30128078f3c5?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    name: 'Chilliwack jacket Bomber HUMANATURE',
    price: '$349.99',
  },
];

const Home = () => {
  const user = useSelector((state) => state.userSlice.user);

  console.log(user);

  return (
    <>
      {/* <Slider /> */}
      <Hero />
      <NewArrival products={products} />
      <BrandValues />
      <ShopByCategories />
      <Collections />
      <BestSelling products={products} />
      <PromotionBanner />
    </>
  );
};

export default Home;
