import ColorForm from "@/components/office/color-form";

import { getColor } from "@/actions/colors/queries";

interface ColorPageProps {
  params: { colorId: string };
}

const ColorPage = async ({ params }: ColorPageProps) => {
  const color = await getColor(params.colorId);

  return <ColorForm initialData={color} />;
};

export default ColorPage;
