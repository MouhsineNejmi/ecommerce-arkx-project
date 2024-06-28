import ProductsClient from "./components/client";

import { getProducts } from "@/actions/products/queries";
import { Product } from "@/types";

const ProductsPage = async () => {
  const products: Product[] = await getProducts();

  return (
    <div className="flex flex-col">
      <ProductsClient products={products} />
    </div>
  );
};

export default ProductsPage;
