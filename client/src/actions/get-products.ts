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
  const products = data?.product || [];

  const enrichedProducts = await Promise.all(
    products.map(async (product: Product) => {
      const enrichedResponse = await fetch(URL, {
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
            whereSize: { id: { _in: product.size_ids } },
            whereColor: { id: { _in: product.color_ids } },
          },
        }),
      });

      const { data: sizes_and_colors } = await enrichedResponse.json();

      // Merge product data with sizes and colors
      return {
        ...product,
        sizes: sizes_and_colors.size,
        colors: sizes_and_colors.color,
      };
    }),
  );

  return enrichedProducts;
};

export default getProducts;
