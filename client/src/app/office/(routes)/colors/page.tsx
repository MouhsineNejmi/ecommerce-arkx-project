import ColorsClient from "./components/client";

import { getColors } from "@/actions/colors/queries";
import { Color } from "@/types";

const ColorsPage = async () => {
  const colors: Color[] = await getColors();

  return (
    <div className="flex flex-col">
      <ColorsClient colors={colors} />
    </div>
  );
};

export default ColorsPage;
