import { Billboard } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_HASURA_GRAPHQL_ENDPOINT}`;

const getBillboard = async (id: string): Promise<Billboard> => {
  const res = await fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-hasura-admin-secret": process.env
        .NEXT_PUBLIC_HASURA_ADMIN_SECRET as string,
    },
    body: JSON.stringify({
      query: `
        query getBillboardById($id: uuid!) {
          billboard_by_pk(id: $id) {
            id
            image_url
            label
            store {
              name
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
  const billboard = data?.billboard_by_pk;

  return billboard;
};

export default getBillboard;
