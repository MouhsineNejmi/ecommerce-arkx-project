"use client";

import { useQuery } from "@apollo/client";
import { useParams } from "next/navigation";

import { GET_PRODUCTS } from "@/graphql/product/product.query";
import { GET_CATEGORIES } from "@/graphql/category/category.query";
import { GET_SIZES } from "@/graphql/size/size.query";
import { GET_COLORS } from "@/graphql/color/color.query";

import ProductForm from "@/components/office/product-form";

interface PagePageProps {
  params: { productId: string };
}

const ProductPage = ({ params }: PagePageProps) => {
  const { storeId } = useParams();

  const { data: productData, loading: loadingProducts } = useQuery(
    GET_PRODUCTS,
    {
      variables: {
        where: { id: { _eq: params.productId }, store_id: { _eq: storeId } },
      },
    },
  );
  const { data: categoriesData, loading: loadingCategories } = useQuery(
    GET_CATEGORIES,
    {
      variables: {
        where: { store_id: { _eq: storeId } },
      },
    },
  );
  const { data: sizesData, loading: loadingSizes } = useQuery(GET_SIZES, {
    variables: {
      where: { store_id: { _eq: storeId } },
    },
  });
  const { data: colorsData, loading: loadingColors } = useQuery(GET_COLORS, {
    variables: {
      where: { store_id: { _eq: storeId } },
    },
  });

  const product = productData?.product[0];
  const categories = categoriesData?.category;
  const sizes = sizesData?.size;
  const colors = colorsData?.color;

  const loading =
    loadingProducts || loadingCategories || loadingSizes || loadingColors;

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <ProductForm
      initialData={product}
      categories={categories}
      sizes={sizes}
      colors={colors}
    />
  );
};

export default ProductPage;
