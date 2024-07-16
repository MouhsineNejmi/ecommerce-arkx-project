"use client";

import React from "react";
import Image from "next/image";
import { X, Plus, Minus } from "lucide-react";

import Currency from "@/components/ui/currency";
import IconButton from "@/components/ui/icon-button";
import { Badge } from "@/components/ui/badge";

import useCart from "@/hooks/use-cart";

import { CartItem as CartItemType } from "@/types";
import { useSession } from "next-auth/react";

interface CartItemProps {
  data: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ data }) => {
  const { data: session } = useSession();
  const cart = useCart();

  const onRemove = () => {
    cart.removeItem(data.id, session?.user.id, session?.access_token);
  };

  const increaseQuantity = () => {
    cart.addItem(
      data.product,
      data.size,
      data.color,
      1,
      session?.user.id,
      session?.access_token
    );
  };

  const decreaseQuantity = () => {
    cart.addItem(
      data.product,
      data.size,
      data.color,
      -1,
      session?.user.id,
      session?.access_token
    );
  };

  return (
    <li className="flex py-6 border-b">
      <div className="relative w-24 h-24 overflow-hidden rounded-md sm:h-48 sm:w-48">
        <Image
          fill
          src={data.product?.images[0]}
          alt="Product Image"
          className="object-cover object-center"
        />
      </div>
      <div className="relative flex flex-col justify-between flex-1 ml-4 sm:ml-6">
        <div className="absolute top-0 right-0 z-10">
          <IconButton onClick={onRemove} icon={<X size={15} />} />
        </div>
        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
          <div className="flex justify-between">
            <p className="text-lg font-semibold text-black">
              {data.product?.name}
            </p>
          </div>
          <Currency value={data.product?.price} />
        </div>
        <div className="grid gap-2">
          <p className="font-bold underline">Product Variant:</p>
          <div className="flex gap-2 mb-2">
            <h4>Size: {data.size?.name}</h4>
            <Badge variant="outline">{data.size?.value}</Badge>
          </div>

          <div className="flex gap-2 mb-2">
            <h4>Color: {data.color?.name}</h4>
            <div
              className="w-6 h-6 border border-gray-600 rounded-full cursor-pointer"
              style={{ backgroundColor: data.color?.value }}
            />
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <IconButton onClick={decreaseQuantity} icon={<Minus size={15} />} />
          {data.quantity}
          <IconButton onClick={increaseQuantity} icon={<Plus size={15} />} />
        </div>
      </div>
    </li>
  );
};

export default CartItem;
