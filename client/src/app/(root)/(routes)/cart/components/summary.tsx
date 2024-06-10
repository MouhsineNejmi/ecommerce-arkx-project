"use client";

import React, { ChangeEvent, useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useMutation } from "@apollo/client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";
import Currency from "@/components/ui/currency";

import useCart from "@/hooks/use-cart";

import {
  CREATE_ORDER,
  CREATE_ORDER_ITEMS,
} from "@/graphql/order/order.mutation";

const Summary = () => {
  const [info, setInfo] = useState({ address: "", phone: "" });
  const stripe = useStripe();
  const elements = useElements();

  const items = useCart((state) => state.items);
  const removeAll = useCart((state) => state.removeAll);
  const totalPrice = items.reduce(
    (total, item) => total + Number(item.product.price) * item.quantity,
    0
  );
  const orderItemsIds = items?.map((item) => item.product.id);

  const [createOrder, { data: order, loading: isCreatingOrder }] =
    useMutation(CREATE_ORDER);
  const [createOrderItems, { loading: isCreatingOrderItems }] =
    useMutation(CREATE_ORDER_ITEMS);

  const onCheckout = async () => {
    if (!info.address) {
      toast({ title: "Address field is required" });
      return;
    }

    const cardElement = elements?.getElement("card");

    try {
      if (!stripe || !cardElement) return null;

      const res = await fetch("/api/create-payment-intent", {
        method: "POST",
        body: JSON.stringify({ data: { amount: Math.floor(totalPrice) } }),
      });

      const { clientSecret } = await res.json();

      const { paymentIntent, error: confirmError } =
        await stripe?.confirmCardPayment(clientSecret, {
          payment_method: { card: cardElement },
        });

      if (confirmError) {
        console.log("Confirm Error: ", confirmError);
        toast({ title: confirmError.message, variant: "destructive" });
        return;
      }

      const orderData = {
        phone: info.phone,
        address: info.address,
        status: paymentIntent.status,
        store_id: "0949a36b-49f7-4180-bcc7-29724b2d83c4",
        amount: Math.floor(totalPrice),
      };
      await createOrder({ variables: { object: orderData } });

      const orderItemsData = items.map((item) => ({
        order_id: order?.insert_order_one.id,
        product_id: item.product.id,
        quantity: item.quantity,
      }));
      await createOrderItems({ variables: { objects: orderItemsData } });

      toast({ title: "Payment completed." });
      removeAll();
      setInfo({ phone: "", address: "" });
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInfo({
      ...info,
      [event.target.name]: event.target.value,
    });
  };

  const loading = items.length === 0 || isCreatingOrder || isCreatingOrderItems;

  return (
    <div className="px-4 py-6 mt-16 rounded-lg bg-gray-50 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
      <h2 className="text-lg font-medium text-gray-900">Order Summary</h2>
      <div className="mt-6 space-y-4">
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

        <CardElement />
      </div>

      <Separator className="mt-8" />

      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
        <div className="text-base font-medium text-gray-400">Order Total</div>
        <Currency value={totalPrice} />
      </div>

      <Button disabled={loading} className="w-full mt-6" onClick={onCheckout}>
        Checkout
      </Button>
    </div>
  );
};

export default Summary;
