"use client";

import { useQuery } from "@apollo/client";
import router, { useRouter } from "next/navigation";

import { GET_BILLBOARD } from "@/graphql/billboard/billboard.query";
import BillboardForm from "@/components/office/billboard-form";

interface BillboardPageProps {
  params: { billboardId: string };
}

const BillboardPage = ({ params }: BillboardPageProps) => {
  const router = useRouter();

  const { data: billboardData, loading } = useQuery(GET_BILLBOARD, {
    variables: { id: params.billboardId },
  });
  const billboard = billboardData?.billboard_by_pk;

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (!billboard && !loading) {
    router.push("/");
  }

  return <BillboardForm initialData={billboard} />;
};

export default BillboardPage;
