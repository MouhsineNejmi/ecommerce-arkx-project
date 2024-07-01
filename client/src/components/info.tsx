import React from "react";
import { ShoppingCart } from "lucide-react";

import Currency from "@/components/ui/currency";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { Product, ProductVariant } from "@/types";

interface InfoProps {
  data: Product;
  productVariants?: ProductVariant[];
  isPreview?: boolean;
}
const Info: React.FC<InfoProps> = ({ data, productVariants, isPreview }) => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900">{data?.name}</h1>
      <div className="flex items-end justify-between mt-3">
        <div className="text-2xl text-gray-900">
          <Currency value={data?.price} />
        </div>
      </div>

      <hr className="my-4" />

      {productVariants && (
        <div className="flex flex-col gap-y-6">
          <div className="flex items-center gap-4">
            <h3 className="font-semibold text-black">Sizes:</h3>
            <div className="flex gap-2">
              {productVariants?.map((productVariant) => (
                <Badge key={productVariant?.size?.id}>
                  {productVariant?.size?.value}
                </Badge>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <h3 className="font-semibold text-black">Colors:</h3>
            {productVariants?.map((productVariant) => (
              <div
                key={productVariant?.color?.id}
                className="w-6 h-6 border border-gray-600 rounded-full"
                style={{ backgroundColor: productVariant?.color?.value }}
              />
            ))}
          </div>
        </div>
      )}
      {!isPreview && (
        <>
          <div className="flex items-center mt-5 gap-x-4">
            <Button className="flex items-center gap-x-2">
              Add To Cart
              <ShoppingCart />
            </Button>
          </div>

          <p className="text-lg text-gray-900 mt-10">{data?.description}</p>
        </>
      )}
    </div>
  );
};

export default Info;
