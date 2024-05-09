"use client";

import { useQuery } from "@apollo/client";
import { useParams, useRouter } from "next/navigation";

import SizeForm from "@/components/office/size-form";
import { GET_SIZES } from "@/graphql/size/size.query";

interface SizePageProps {
  params: { sizeId: string };
}

const SizePage = ({ params }: SizePageProps) => {
  const router = useRouter();
  const { storeId } = useParams();

  const { data: sizeData, loading } = useQuery(GET_SIZES, {
    variables: {
      where: { id: { _eq: params.sizeId }, store_id: { _eq: storeId } },
    },
  });

  const size = sizeData?.size[0];

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return <SizeForm initialData={size} />;
};

export default SizePage;
