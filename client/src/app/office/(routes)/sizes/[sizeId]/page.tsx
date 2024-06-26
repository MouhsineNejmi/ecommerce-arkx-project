import SizeForm from "@/components/office/size-form";

import { getSize } from "@/actions/sizes/queries";

interface SizePageProps {
  params: { sizeId: string };
}

const SizePage = async ({ params }: SizePageProps) => {
  const size = await getSize(params.sizeId);

  return <SizeForm initialData={size} />;
};

export default SizePage;
