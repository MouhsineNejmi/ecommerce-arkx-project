"use client";

import { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";

import Container from "@/components/ui/container";
import CartItem from "./components/cart-item";
import Summary from "./components/summary";
import useCart from "@/hooks/use-cart";
import getStripe from "@/lib/get-stripejs";

import { CartItem as CartItemType } from "@/types";

const stripePromise = getStripe();

const CartPage = () => {
  const { items: cartItems } = useCart();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="bg-white">
      <Container>
        <div className="px-4 py-16 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-black">Shopping Cart</h1>
          <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start gap-x-12">
            <div className="lg:col-span-7">
              {cartItems?.length === 0 && (
                <p className="text-neutral-500">No items added to cart</p>
              )}
              <ul>
                {cartItems?.map((item: CartItemType) => (
                  <CartItem key={item.id} data={item} />
                ))}
              </ul>
            </div>

            <Elements stripe={stripePromise}>
              <Summary />
            </Elements>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CartPage;
