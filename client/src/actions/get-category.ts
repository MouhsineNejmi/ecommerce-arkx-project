import { Category } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_HASURA_GRAPHQL_ENDPOINT}`;

const getCategory = async (id: string): Promise<Category> => {
  const res = await fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-hasura-admin-secret": process.env
        .NEXT_PUBLIC_HASURA_ADMIN_SECRET as string,
    },
    body: JSON.stringify({
      query: `
        query getCategory($id: uuid!) {
          category_by_pk(id: $id) {
            id
            name
            billboard {
              id
              image_url
              label
            }
          }
        }
      `,
      variables: {
        id,
      },
    }),
  });

  const { data } = await res.json();
  const category = data?.category_by_pk;

  return category;
};

export default getCategory;
