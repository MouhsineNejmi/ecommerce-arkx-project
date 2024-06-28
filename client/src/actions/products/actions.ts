import { Product } from "@/types";
import { ProductFormInput, productSchema } from "@/schemas/product";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;

type CreateProductResponse = Product | null;

export const createProduct = async (
  values: ProductFormInput,
  token: string
): Promise<CreateProductResponse> => {
  const validateFields = productSchema.safeParse(values);

  if (!validateFields.success) {
    return null;
  }

  const res = await fetch(`${URL}`, {
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

  const product = await res.json();

  return product;
};

export const editProduct = async (
  productId: string,
  values: ProductFormInput,
  token: string
): Promise<Product | null> => {
  const res = await fetch(`${URL}/${productId}`, {
    method: "POST",
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...values }),
  });

  if (!res.ok) {
    const { message } = await res.json();
    return message;
  }

  const product = await res.json();

  return product;
};

export const deleteProduct = async (
  productId: string,
  token: string
): Promise<Product | null> => {
  const res = await fetch(`${URL}/${productId}`, {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    const { message } = await res.json();
    return message;
  }

  const product = await res.json();
  return product;
};
