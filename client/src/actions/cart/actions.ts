import { Cart, CartItem } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/cart`;

type CreateCartResponse = Cart | CartItem | null;

export const addToCart = async (
  userId: string,
  values: CartItem,
  token: string
): Promise<CreateCartResponse> => {
  if (!userId || !values || !token) {
    return null;
  }

  const res = await fetch(`${URL}/${userId}`, {
    method: "POST",
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...values }),
  });

  if (!res.ok) {
    // const { message } = await res.json();
    // return message;
    return null;
  }

  const cart = await res.json();

  return cart;
};

interface UpdateCartItemDto {
  quantity: number;
}

export const updateCartItem = async (
  id: string,
  values: UpdateCartItemDto,
  token: string
) => {
  const res = await fetch(`${URL}/${id}`, {
    method: "PATCH",
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...values }),
  });

  if (!res.ok) {
    // const { message } = await res.json();
    // return message;
    return null;
  }

  const cart = await res.json();

  return cart;
};

export const removeCartItem = async (id: string, token: string) => {
  const res = await fetch(`${URL}/${id}`, {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    // const { message } = await res.json();
    // return message;
    return null;
  }

  const cart = await res.json();

  return cart;
};

export const clearCart = async (id: string, token: string) => {
  const res = await fetch(`${URL}/${id}`, {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    // const { message } = await res.json();
    // return message;
    return null;
  }

  const cart = await res.json();

  return cart;
};
