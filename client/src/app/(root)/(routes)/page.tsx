import Container from "@/components/ui/container";
import Billboard from "@/components/billboard";
import ProductsSection from "@/components/products-section";

import { getBillboard } from "@/actions/billboards/queries";
import { getProducts } from "@/actions/products/queries";

export const revalidate = 0;

const HomePage = async () => {
  const billboard = await getBillboard({
    billboardId: "c8a518c0-e366-47a2-ba4b-19fba07102ea",
  });
  const products = await getProducts({ is_featured: true });

  return (
    <Container>
      <div className="pb-10 space-y-10">
        <Billboard data={billboard} name="Shop Now" />
        <div className="flex flex-col px-4 gap-y-8 sm:px-6 lg:px-8">
          <ProductsSection title="Featured Products" items={products} />
        </div>
      </div>
    </Container>
  );
};

export default HomePage;
