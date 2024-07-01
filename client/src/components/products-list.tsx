import NoResults from "@/components/ui/no-results";
import ProductCard from "@/components/ui/product-card";

import { Product } from "@/types";

import { getProductVariants } from "@/actions/product-variant/queries";

interface ProductsListProps {
  products: Product[];
}

const ProductsList = ({ products }: ProductsListProps) => {
  if (!products) return <NoResults />;

  return products.map(async (product) => {
    const productVariants = await getProductVariants(product.id);

    return (
      <ProductCard
        key={product.id}
        data={product}
        productVariants={productVariants}
      />
    );
  });
};

export default ProductsList;
