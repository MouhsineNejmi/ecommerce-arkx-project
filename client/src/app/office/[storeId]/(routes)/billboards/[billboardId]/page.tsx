"use client";

import { useQuery } from "@apollo/client";
import { useParams } from "next/navigation";

import { GET_BILLBOARDS } from "@/graphql/billboard/billboard.query";
import BillboardForm from "@/components/office/billboard-form";

interface BillboardPageProps {
  params: { billboardId: string };
}

const BillboardPage = ({ params }: BillboardPageProps) => {
  const { storeId } = useParams();

  const { data: billboardData, loading } = useQuery(GET_BILLBOARDS, {
    variables: {
      where: { id: { _eq: params.billboardId }, store_id: { _eq: storeId } },
    },
  });

  const billboard = billboardData?.billboard[0];

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return <BillboardForm initialData={billboard} />;
};

export default BillboardPage;
