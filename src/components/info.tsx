import { ShoppingCart } from "lucide-react";

import Currency from "@/components/ui/currency";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { ProductSingle } from "@/types";

interface InfoProps {
  data: ProductSingle;
}
const Info: React.FC<InfoProps> = ({ data }) => {
  // console.log("INFO PRODUCT: ", data);

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900">{data?.name}</h1>
      <div className="flex items-end justify-between mt-3">
        <div className="text-2xl text-gray-900">
          <Currency value={data?.price} />
        </div>
      </div>

      <hr className="my-4" />

      <div className="flex flex-col gap-y-6">
        <div className="flex items-center gap-4">
          <h3 className="font-semibold text-black">Sizes:</h3>
          <div className="flex gap-2">
            {data?.sizes?.map((size) => (
              <Badge key={size.id}>{size.value}</Badge>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <h3 className="font-semibold text-black">Colors:</h3>
          {data?.colors?.map((color) => (
            <div
              key={color.id}
              className="w-6 h-6 border border-gray-600 rounded-full"
              style={{ backgroundColor: color.value }}
            />
          ))}
        </div>
      </div>
      <div className="flex items-center mt-5 gap-x-4">
        <Button className="flex items-center gap-x-2">
          Add To Cart
          <ShoppingCart />
        </Button>
      </div>

      <p className="text-lg text-gray-900 mt-10">{data?.description}</p>
    </div>
  );
};

export default Info;
