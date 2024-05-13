import { Size } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_HASURA_GRAPHQL_ENDPOINT}`;

const getSizes = async (): Promise<Size[]> => {
  const res = await fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-hasura-admin-secret": process.env
        .NEXT_PUBLIC_HASURA_ADMIN_SECRET as string,
    },
    body: JSON.stringify({
      query: `
        query getSizes($where: size_bool_exp) {
          size(where: $where) {
            id
            name
            value
          }
        }
      `,
    }),
  });

  const { data } = await res.json();
  const sizes = data?.size;

  return sizes;
};

export default getSizes;
