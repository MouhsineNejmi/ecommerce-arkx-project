import ProductForm from "@/components/office/product-form";

import { getProduct } from "@/actions/products/queries";
import { getProductVariants } from "@/actions/product-variant/queries";
import { getCategories } from "@/actions/categories/queries";
import { getSizes } from "@/actions/sizes/queries";
import { getColors } from "@/actions/colors/queries";

interface ProductPageProps {
  params: { productId: string };
}

const ProductPage = async ({ params }: ProductPageProps) => {
  const [product, productVariants, categories, sizes, colors] =
    await Promise.all([
      getProduct(params.productId),
      getProductVariants(params.productId),
      getCategories(),
      getSizes(),
      getColors(),
    ]);

  return (
    <ProductForm
      initialData={product}
      productVariants={productVariants}
      categories={categories}
      sizes={sizes}
      colors={colors}
    />
  );
};

export default ProductPage;
