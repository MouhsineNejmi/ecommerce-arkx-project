import SizesClient from "./components/client";

import { getSizes } from "@/actions/sizes/queries";
import { Size } from "@/types";

const SizesPage = async () => {
  const sizes: Size[] = await getSizes();

  return (
    <div className="flex flex-col">
      <SizesClient sizes={sizes} />
    </div>
  );
};

export default SizesPage;
