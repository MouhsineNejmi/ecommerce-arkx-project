import { Product } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_HASURA_GRAPHQL_ENDPOINT}`;

interface Query {
  categoryId?: string;
  colorId?: string;
  sizeId?: string;
  isFeatured?: boolean;
}

const getProducts = async (query: Query): Promise<Product[]> => {
  const res = await fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-hasura-admin-secret": process.env
        .NEXT_PUBLIC_HASURA_ADMIN_SECRET as string,
    },
    body: JSON.stringify({
      query: `
        query getProducts($where: product_bool_exp) {
          product(where: $where) {
            id
            name
            description
            images
            price
            category { 
              name
            }
          }
        }
      `,
      variables: {
        where: {
          category_id: { _eq: query.categoryId },
          color_ids: { _contains: query.colorId },
          size_ids: { _contains: query.sizeId },
          is_featured: { _eq: query.isFeatured },
        },
      },
    }),
  });

  const { data } = await res.json();
  const products = data?.product;

  return products;
};

export default getProducts;
