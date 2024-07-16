/* eslint-disable no-unused-vars */
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import { toast } from "@/components/ui/use-toast";
import { Color, Product, Size } from "@/types";
import {
  addToCart,
  updateCartItem,
  removeCartItem,
  clearCart,
} from "@/actions/cart/actions";

type CartItem = {
  product: Product;
  color: Color;
  size: Size;
  quantity: number;
  id: string;
};

interface CartStore {
  items: CartItem[];
  addItem: (
    data: Product,
    size: Size,
    color: Color,
    quantity?: number,
    userId?: string,
    token?: string
  ) => void;
  removeItem: (id: string, userId?: string, token?: string) => void;
  removeAll: (userId?: string, token?: string) => void;
}

const useCart = create(
  persist<CartStore>(
    (set, get) => ({
      items: [],
      addItem: async (
        data: Product,
        size: Size,
        color: Color,
        quantity: number = 1,
        userId?: string,
        token?: string
      ) => {
        const currentItems = get().items;
        const existingItem = currentItems.find(
          (item) =>
            item.product.id === data.id &&
            item.size.id === size.id &&
            item.color.id === color.id
        );

        if (existingItem) {
          const updatedQuantity = existingItem.quantity + quantity;

          if (updatedQuantity > 0) {
            if (userId && token) {
              const response = await updateCartItem(
                existingItem.id,
                { ...existingItem, quantity: updatedQuantity },
                token
              );

              console.log("Use Cart Update Cart Item: ", response);
            }

            set((state) => ({
              items: state.items.map((item) =>
                item.id === existingItem.id
                  ? { ...item, quantity: updatedQuantity }
                  : item
              ),
            }));

            toast({
              title: `Added ${quantity} more of ${data.name} to your cart.`,
            });
          } else {
            if (userId && token) {
              await removeCartItem(existingItem.id, token);
            }
            set({
              items: currentItems.filter((item) => item.id !== existingItem.id),
            });
            toast({
              title: `${data.name} removed from your cart.`,
            });
          }
        } else {
          const newItemId = `${data.id}-${size.id}-${color.id}-${Date.now()}`;

          if (userId && token) {
            await addToCart(
              userId,
              {
                product: data,
                color,
                size,
                quantity,
                id: newItemId,
              },
              token
            );
          }

          set({
            items: [
              ...currentItems,
              {
                product: data,
                color,
                size,
                quantity,
                id: newItemId,
              },
            ],
          });
          toast({ title: "Item added to cart.", variant: "success" });
        }
      },
      removeItem: async (id: string, userId?: string, token?: string) => {
        if (userId && token) {
          await removeCartItem(id, token);
        }

        set({
          items: [...get().items.filter((item) => item.id !== id)],
        });
      },
      removeAll: async (userId?: string, token?: string) => {
        if (userId && token) {
          await clearCart(userId, token);
        }

        set({ items: [] });
      },
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useCart;
