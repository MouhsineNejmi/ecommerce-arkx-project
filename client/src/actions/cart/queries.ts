import { Cart } from "@/types";

const URL = process.env.NEXT_PUBLIC_API_URL;

export const getCart = async (userId: string): Promise<Cart | null> => {
  try {
    const res = await fetch(`${URL}/cart/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const error = await res.json();
      console.log("GET CART QUERY ERROR: ", error);

      return null;
    }

    const cart = await res.json();

    return cart;
  } catch {
    return null;
  }
};
