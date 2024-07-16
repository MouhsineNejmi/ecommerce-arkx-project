"use client";

import React, { useState, useEffect } from "react";
import { ShoppingCart } from "lucide-react";

import useCart from "@/hooks/use-cart";
import { useToast } from "@/components/ui/use-toast";

import Currency from "@/components/ui/currency";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

import { Product, ProductVariant, Size, Color } from "@/types";
import { useSession } from "next-auth/react";

interface InfoProps {
  data: Product;
  productVariants?: ProductVariant[];
  isPreview?: boolean;
}

const Info: React.FC<InfoProps> = ({ data, productVariants, isPreview }) => {
  const { toast } = useToast();
  const { addItem } = useCart();
  const { data: session } = useSession();

  const [selectedColor, setSelectedColor] = useState<string | undefined>(
    undefined
  );
  const [selectedSize, setSelectedSize] = useState<string | undefined>(
    undefined
  );
  const [availableSizes, setAvailableSizes] = useState<Size[]>([]);
  const [availableColors, setAvailableColors] = useState<Color[]>([]);

  // Update available sizes and colors based on the current selection
  useEffect(() => {
    if (productVariants) {
      if (selectedColor) {
        const sizesForColor = productVariants
          .filter((variant) => variant.color_id === selectedColor)
          .map((variant) => variant.size);
        setAvailableSizes(sizesForColor as Size[]);
      } else {
        setAvailableSizes(
          productVariants.map((variant) => variant.size) as Size[]
        );
      }

      if (selectedSize) {
        const colorsForSize = productVariants
          .filter((variant) => variant.size_id === selectedSize)
          .map((variant) => variant.color);
        setAvailableColors(colorsForSize as Color[]);
      } else {
        setAvailableColors(
          productVariants.map((variant) => variant.color) as Color[]
        );
      }
    }
  }, [selectedColor, selectedSize, productVariants]);

  const handleAddToCart = () => {
    if (!selectedColor || !selectedSize || !productVariants) {
      toast({ title: "Please select product size and color first." });
      return;
    }

    const selectedVariant = productVariants.find(
      (variant) =>
        variant.color_id === selectedColor && variant.size_id === selectedSize
    );

    if (selectedVariant) {
      addItem(
        data,
        selectedVariant.size as Size,
        selectedVariant.color as Color,
        1,
        session?.user.id,
        session?.access_token
      );
    } else {
      toast({
        title: "Could not add this item to cart! Please try again later.",
      });
    }
  };

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
              {availableSizes?.map((size) => (
                <Badge
                  key={size?.id}
                  onClick={() => setSelectedSize(size.id)}
                  className={cn(
                    "cursor-pointer",
                    selectedSize === size.id && "bg-emerald-500"
                  )}
                >
                  {size?.value}
                </Badge>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <h3 className="font-semibold text-black">Colors:</h3>
            {availableColors?.map((color) => (
              <div
                key={color?.id}
                onClick={() => setSelectedColor(color.id)}
                className={cn(
                  "w-6 h-6 border border-gray-600 rounded-full cursor-pointer",
                  selectedColor === color.id && "border-2 border-emerald-500"
                )}
                style={{ backgroundColor: color?.value }}
              />
            ))}
          </div>
        </div>
      )}

      <div className="flex items-center mt-5 gap-x-4">
        <Button className="flex items-center gap-x-2" onClick={handleAddToCart}>
          Add To Cart
          <ShoppingCart />
        </Button>
      </div>

      {!isPreview && (
        <p className="text-lg text-gray-900 mt-10">{data?.description}</p>
      )}
    </div>
  );
};

export default Info;
