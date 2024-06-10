"use client";

import { useQuery } from "@apollo/client";
import { useParams } from "next/navigation";

import CategoryForm from "@/components/office/category-form";

import { GET_CATEGORIES } from "@/graphql/category/category.query";
import { GET_BILLBOARDS } from "@/graphql/billboard/billboard.query";

interface CategoryPageProps {
  params: { categoryId: string };
}

const BillboardPage = ({ params }: CategoryPageProps) => {
  const { storeId } = useParams();

  const { data: categoryData, loading: loadingCategory } = useQuery(
    GET_CATEGORIES,
    {
      variables: {
        where: { id: { _eq: params.categoryId }, store_id: { _eq: storeId } },
      },
    }
  );
  const { data: billboardsData, loading: loadingBillboards } = useQuery(
    GET_BILLBOARDS,
    {
      variables: { where: { store_id: { _eq: storeId } } },
    }
  );

  const category = categoryData?.category[0];
  const billboards = billboardsData?.billboard;

  const loading = loadingCategory || loadingBillboards;

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return <CategoryForm initialData={category} billboards={billboards} />;
};

export default BillboardPage;
