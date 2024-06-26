import getUserSession from "../get-user-session";

import { Category } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/categories`;

export const getCategories = async (): Promise<Category[]> => {
  const session = await getUserSession();

  const res = await fetch(URL, {
    method: "GET",
    headers: {
      authorization: `Bearer ${session?.access_token}`,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    return [];
  }

  const categories = await res.json();

  console.log(categories);

  return categories;
};

export const getCategory = async (
  categoryId: string
): Promise<Category | null> => {
  const session = await getUserSession();

  const res = await fetch(`${URL}/${categoryId}`, {
    method: "GET",
    headers: {
      authorization: `Bearer ${session?.access_token}`,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    const { message } = await res.json();
    console.log(message);

    return null;
  }

  const category = await res.json();

  return category;
};
