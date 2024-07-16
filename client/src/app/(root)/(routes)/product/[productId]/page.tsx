import React from "react";

import { getProducts, getProduct } from "@/actions/products/queries";
import { getProductVariants } from "@/actions/product-variant/queries";

import Container from "@/components/ui/container";
import Gallery from "@/components/gallery";
import Info from "@/components/info";
import ProductsSection from "@/components/products-section";

interface ProductPageProps {
  params: {
    productId: string;
  };
}

const ProductPage: React.FC<ProductPageProps> = async ({ params }) => {
  const product = await getProduct(params.productId);
  const variants = await getProductVariants(params.productId);

  const suggestProducts = await getProducts({
    category_id: product?.category?.id,
  });

  return (
    <div className="bg-white">
      <Container>
        <div className="px-4 py-10 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
            {/* Gallery */}
            <Gallery images={product?.images as string[]} />
            <div className="px-4 mt-0 sm:mt-16 sm:px-0 lg:mt-0">
              {/* Info */}
              <Info data={product!} productVariants={variants} />
            </div>
          </div>
          <hr className="my-10" />
          <ProductsSection title="Related Items" items={suggestProducts} />
        </div>
      </Container>
    </div>
  );
};

export default ProductPage;
