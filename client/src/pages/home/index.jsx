import Hero from './hero.component';
import NewArrival from './new-arrival.component';
import ShopByCategories from './shop-by-categories.component';
import Collections from './collections.component';
import { useSelector } from 'react-redux';

import BestSelling from './best-selling.component';
import BrandValues from './brand-values.component';
import PromotionBanner from './promotion-banner.component';

import { products } from '../../data/products';

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
