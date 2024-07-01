import ProductsList from "./products-list";

import { Product } from "@/types";

interface ProductsSectionProps {
  title: string;
  items: Product[];
}

const ProductsSection = ({ title, items }: ProductsSectionProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-3xl font-bold">{title}</h3>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <ProductsList products={items} />
      </div>
    </div>
  );
};

export default ProductsSection;
