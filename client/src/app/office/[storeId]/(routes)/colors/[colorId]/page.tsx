"use client";

import { useQuery } from "@apollo/client";
import { useParams } from "next/navigation";

import ColorForm from "@/components/office/color-form";
import { GET_COLORS } from "@/graphql/color/color.query";

interface ColorPageProps {
  params: { colorId: string };
}

const ColorPage = ({ params }: ColorPageProps) => {
  const { storeId } = useParams();

  const { data: colorData, loading } = useQuery(GET_COLORS, {
    variables: {
      where: { id: { _eq: params.colorId }, store_id: { _eq: storeId } },
    },
  });

  const color = colorData?.color[0];

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return <ColorForm initialData={color} />;
};

export default ColorPage;
