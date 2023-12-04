import { useGetAllProductsQuery } from '../../app/api/products.api';

import Hero from './hero.component';
import NewArrival from './new-arrival.component';
import ShopByCategories from './shop-by-categories.component';
import Collections from './collections.component';
import BestSelling from './best-selling.component';
import BrandValues from './brand-values.component';
import PromotionBanner from './promotion-banner.component';
import { Loader2 } from 'lucide-react';

const Home = () => {
  const { data: products, isLoading } = useGetAllProductsQuery();

  return (
    <>
      {/* <Slider /> */}
      <Hero />
      {isLoading ? <Loader2 /> : <NewArrival products={products} />}
      <BrandValues />
      <ShopByCategories />
      <Collections />
      {isLoading ? <Loader2 /> : <BestSelling products={products} />}
      <PromotionBanner />
    </>
  );
};

export default Home;
