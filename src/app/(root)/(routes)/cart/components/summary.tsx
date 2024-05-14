"use client";

import { useSearchParams } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";
import Currency from "@/components/ui/currency";

import useCart from "@/hooks/use-cart";

const Summary = () => {
  const [info, setInfo] = useState({ address: "", phone: "" });
  const searchParams = useSearchParams();
  const items = useCart((state) => state.items);
  const removeAll = useCart((state) => state.removeAll);
  const totalPrice = items.reduce(
    (total, item) => total + Number(item.product.price) * item.quantity,
    0
  );

  useEffect(() => {
    if (searchParams.get("success")) {
      toast({ title: "Payment completed." });
      removeAll();
    }
    if (searchParams.get("canceled")) {
      toast({ title: "Something went wrong.", variant: "destructive" });
    }
  }, [searchParams, removeAll]);

  const onCheckout = async () => {
    if (!info.address) {
      toast({ title: "Address field is required" });
      return;
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInfo({
      ...info,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div className="px-4 py-6 mt-16 rounded-lg bg-gray-50 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
      <h2 className="text-lg font-medium text-gray-900">Order Summary</h2>
      <div className="mt-6 space-y-4">
        <div className="grid gap-2">
          <div className="space-y-2">
            <Label>
              Address:<span className="text-red-500 text-lg">*</span>
            </Label>
            <Input
              name="address"
              placeholder="Your delivery address"
              value={info.address}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label>Phone Number:</Label>
            <Input
              name="phone"
              placeholder="Your phone number"
              value={info.phone}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>

      <Separator className="mt-8" />

      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
        <div className="text-base font-medium text-gray-400">Order Total</div>
        <Currency value={totalPrice} />
      </div>

      <Button
        disabled={items.length === 0}
        className="w-full mt-6"
        onClick={onCheckout}
      >
        Checkout
      </Button>
    </div>
  );
};

export default Summary;
