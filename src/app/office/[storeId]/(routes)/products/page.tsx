import ProductsClient from "./components/client";

const ProductsPage = () => {
  return (
    <div className="flex-col">
      <div className="flex-1">
        <ProductsClient />
      </div>
    </div>
  );
};

export default ProductsPage;
