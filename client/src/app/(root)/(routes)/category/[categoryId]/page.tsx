import React from "react";

import { getColors } from "@/actions/colors/queries";
import { getCategory } from "@/actions/categories/queries";
import { getProducts } from "@/actions/products/queries";
import { getSizes } from "@/actions/sizes/queries";
import { getBillboard } from "@/actions/billboards/queries";

import Billboard from "@/components/billboard";
import Container from "@/components/ui/container";
import NoResults from "@/components/ui/no-results";
import ProductCard from "@/components/ui/product-card";
import Filter from "./components/filter";
import MobileFilters from "./components/mobile-filter";

export const revalidate = 0;

interface CategoryPageProps {
  params: {
    categoryId: string;
  };
  searchParams: {
    colorId: string;
    sizeId: string;
  };
}

const CategoryPage: React.FC<CategoryPageProps> = async ({
  params,
  searchParams,
}) => {
  const category = await getCategory(params.categoryId);
  const products = await getProducts({
    category_id: params.categoryId,
    color_id: searchParams.colorId,
    size_id: searchParams.sizeId,
  });
  const sizes = await getSizes();
  const colors = await getColors();
  const billboard = await getBillboard({ categoryId: params.categoryId });

  return (
    <div className="bg-white">
      <Container>
        <Billboard data={billboard} name={category?.name} />
        <div className="px-4 pb-24 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-5 lg:gap-x-8">
            {/*Add Mobile Filters*/}
            <MobileFilters sizes={sizes} colors={colors} />
            {/*Add Computer Filters*/}
            <div className="hidden lg:block">
              <Filter valueKey="sizeId" name="Sizes" data={sizes} />
              <Filter valueKey="colorId" name="Colors" data={colors} />
            </div>
            <div className="mt-6 lg:col-span-4 lg:mt-0">
              {products?.length === 0 && <NoResults />}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                {products?.map((item) => (
                  <ProductCard key={item.id} data={item} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CategoryPage;
