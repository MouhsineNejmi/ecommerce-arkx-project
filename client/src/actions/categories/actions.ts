import { Category } from "@/types";
import { CategoryFormInput, categorySchema } from "@/schemas/category";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/categories`;

type CreateCategoryResponse = Category | string;

export const createCategory = async (
  values: CategoryFormInput,
  token: string
): Promise<CreateCategoryResponse> => {
  const validateFields = categorySchema.safeParse(values);

  if (!validateFields.success) {
    return "Invalid Fields!";
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
    const { message } = await res.json();
    return message;
  }

  const category = await res.json();

  return category;
};

export const editCategory = async (
  categoryId: string,
  values: CategoryFormInput,
  token: string
): Promise<Category | null> => {
  const res = await fetch(`${URL}/${categoryId}`, {
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

  const billboard = await res.json();

  return billboard;
};

export const deleteCategory = async (
  categoryId: string,
  token: string
): Promise<Category | null> => {
  const res = await fetch(`${URL}/${categoryId}`, {
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

  const category = await res.json();
  return category;
};
