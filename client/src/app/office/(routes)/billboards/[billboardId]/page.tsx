import BillboardForm from "@/components/office/billboard-form";

import { getBillboard } from "@/actions/billboards/queries";

interface BillboardPageProps {
  params: { billboardId: string };
}

const BillboardPage = async ({ params }: BillboardPageProps) => {
  const billboard = await getBillboard(params.billboardId);

  return <BillboardForm initialData={billboard} />;
};

export default BillboardPage;
