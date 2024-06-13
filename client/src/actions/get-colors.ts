import { Color } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_HASURA_GRAPHQL_ENDPOINT}`;

const getColors = async (): Promise<Color[]> => {
  const res = await fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-hasura-admin-secret": process.env
        .NEXT_PUBLIC_HASURA_ADMIN_SECRET as string,
    },
    body: JSON.stringify({
      query: `
        query getColors($where: color_bool_exp) {
          color(where: $where) {
            id
            name
            value
          }
        }
      `,
    }),
  });

  const { data } = await res.json();
  const colors = data?.color;

  return colors;
};

export default getColors;
