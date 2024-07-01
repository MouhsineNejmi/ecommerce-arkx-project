import { Product, ProductFilters } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;

export const getProducts = async (
  filters: ProductFilters = {}
): Promise<Product[]> => {
  try {
    const queryParams = new URLSearchParams(
      Object.entries(filters).reduce((acc, [key, value]) => {
        if (value !== undefined) acc[key] = String(value);
        return acc;
      }, {} as Record<string, string>)
    ).toString();

    const urlWithParams = `${URL}?${queryParams}`;

    const res = await fetch(urlWithParams, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const error = await res.json();
      console.log("ERROR: ", error);

      return [];
    }

    const products = await res.json();

    return products;
  } catch {
    return [];
  }
};

export const getProduct = async (
  productId: string
): Promise<Product | null> => {
  try {
    const res = await fetch(`${URL}/${productId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const { message } = await res.json();
      console.log(message);

      return null;
    }

    const product = await res.json();

    return product;
  } catch {
    return null;
  }
};
