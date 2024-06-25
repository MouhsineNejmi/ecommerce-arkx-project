import getUserSession from "../get-user-session";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/categories`;

export const getCategories = async () => {
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

  return categories;
};
