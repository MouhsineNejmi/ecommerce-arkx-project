import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import { toast } from "@/components/ui/use-toast";
import { Product } from "@/types";

type CartItem = {
  product: Product;
  quantity: number;
};

interface CartStore {
  items: CartItem[];
  addItem: (data: Product, quantity?: number) => void;
  removeItem: (id: string) => void;
  removeAll: () => void;
}

const useCart = create(
  persist<CartStore>(
    (set, get) => ({
      items: [],
      addItem: (data: Product, quantity: number = 1) => {
        const currentItems = get().items;
        const existingItem = currentItems.find(
          (item) => item.product.id === data.id
        );

        if (existingItem) {
          const updatedQuantity = existingItem.quantity + quantity;
          if (updatedQuantity > 0) {
            set((state) => ({
              items: state.items.map((item) =>
                item.product.id === data.id
                  ? { ...item, quantity: updatedQuantity }
                  : item
              ),
            }));
            toast({
              title: `Added ${quantity} more of ${data.name} to your cart.`,
            });
          } else {
            set({
              items: currentItems.filter((item) => item.product.id !== data.id),
            });
            toast({
              title: `${data.name} removed from your cart.`,
            });
          }
        } else {
          set({ items: [...currentItems, { product: data, quantity }] });
          toast({ title: "Item added to cart.", variant: "success" });
        }
      },
      removeItem: (id: string) => {
        set({
          items: [...get().items.filter((item) => item.product.id !== id)],
        });
      },
      removeAll: () => set({ items: [] }),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useCart;
