import BillboardsClient from "./components/client";

import { getBillboards } from "@/actions/billboards/queries";
import { Billboard } from "@/types";

const BillboardsPage = async () => {
  const billboards: Billboard[] = await getBillboards();

  return (
    <div className="flex-col">
      <BillboardsClient billboards={billboards} />
    </div>
  );
};

export default BillboardsPage;
