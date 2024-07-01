import BillboardForm from "@/components/office/billboard-form";

import { getBillboard } from "@/actions/billboards/queries";
import { getCategories } from "@/actions/categories/queries";

interface BillboardPageProps {
  params: { billboardId: string };
}

const BillboardPage = async ({ params }: BillboardPageProps) => {
  const billboard = await getBillboard({ billboardId: params.billboardId });
  const categories = await getCategories();

  return <BillboardForm initialData={billboard} categories={categories} />;
};

export default BillboardPage;
