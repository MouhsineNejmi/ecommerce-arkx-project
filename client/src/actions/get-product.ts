import { ProductSingle } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_HASURA_GRAPHQL_ENDPOINT}`;

const getProduct = async (id: string): Promise<ProductSingle> => {
  const res = await fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-hasura-admin-secret": process.env
        .NEXT_PUBLIC_HASURA_ADMIN_SECRET as string,
    },
    body: JSON.stringify({
      query: `
        query getProduct($id: uuid!) {
          product_by_pk(id: $id) {
            id
            name
            description
            images
            price
            category { 
              name
            }
            size_ids
            color_ids
          }
        }
      `,
      variables: {
        id,
      },
    }),
  });

  const { data } = await res.json();
  const product = data?.product_by_pk;

  const response = await fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-hasura-admin-secret": process.env
        .NEXT_PUBLIC_HASURA_ADMIN_SECRET as string,
    },
    body: JSON.stringify({
      query: `
        query getSizesAndColors($whereSize: size_bool_exp!, $whereColor: color_bool_exp!) {
          size(where: $whereSize) {
            id
            name
            value
          }
          color(where: $whereColor) {
            id
            name
            value
          }
        }
      `,
      variables: {
        whereSize: { id: { _in: product?.size_ids } },
        whereColor: { id: { _in: product?.color_ids } },
      },
    }),
  });

  const { data: sizes_and_colors } = await response.json();

  return {
    ...product,
    sizes: sizes_and_colors.size,
    colors: sizes_and_colors.color,
  };
};

export default getProduct;
