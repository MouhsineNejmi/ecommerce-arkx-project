import {
  ProductVariantFormInput,
  // productVariantSchema,
} from "@/schemas/product-variant";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/product-variant`;

type CreateProductResponse = ProductVariant[] | null;

interface ProductVariant {
  id: string;
  product_id: string;
  size_id: string;
  color_id: string;
  created_at?: Date;
  updated_at?: Date;
}

export const createProductVariants = async (
  values: ProductVariantFormInput[],
  token: string
): Promise<CreateProductResponse> => {
  // const validateFields = productVariantSchema.safeParse(values);

  // if (!validateFields.success) {
  //   console.log("Invalid Fiedls Product Variant: ", validateFields.data);

  //   return null;
  // }

  const res = await fetch(URL, {
    method: "POST",
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });

  if (!res.ok) {
    const { message } = await res.json();
    console.log("Could not create Product Variant", message);

    return null;
  }

  const productVariants = await res.json();
  return productVariants;
};

export const editProductVariants = async (
  values: ProductVariant,
  token: string
): Promise<ProductVariant | null> => {
  const res = await fetch(`${URL}/${values.id}`, {
    method: "POST",
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });

  if (!res.ok) {
    const { message } = await res.json();
    return message;
  }

  const productVariants = await res.json();
  return productVariants;
};

export const deleteProductVariants = async (
  productVariantIds: string[],
  token: string
): Promise<ProductVariant | null> => {
  const res = await fetch(URL, {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(productVariantIds),
  });

  if (!res.ok) {
    const { message } = await res.json();
    return message;
  }

  const products = await res.json();
  return products;
};
