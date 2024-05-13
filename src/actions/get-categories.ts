import { Category } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_HASURA_GRAPHQL_ENDPOINT}`;

const getCategories = async (): Promise<Category[]> => {
  const res = await fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-hasura-admin-secret": process.env
        .NEXT_PUBLIC_HASURA_ADMIN_SECRET as string,
    },
    body: JSON.stringify({
      query: `
        query getCategories {
          category {
            id
            name
          }
        }
      `,
    }),
  });

  const { data } = await res.json();
  const categories = data?.category;

  return categories;
};

export default getCategories;
