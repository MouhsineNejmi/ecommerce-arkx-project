const URL = `${process.env.NEXT_PUBLIC_HASURA_GRAPHQL_ENDPOINT}`;

const getStockCount = async (storeId: string): Promise<number> => {
  const res = await fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-hasura-admin-secret": process.env
        .NEXT_PUBLIC_HASURA_ADMIN_SECRET as string,
    },
    body: JSON.stringify({
      query: `
        query getStockCount($where: product_bool_exp!) {
          product_aggregate(where: $where) {
            aggregate {
              count
            }
          }
        }
      `,
      variables: {
        where: { store_id: { _eq: storeId } },
      },
    }),
  });

  const { data } = await res.json();
  const stockCount = data?.product_aggregate?.aggregate?.count;

  return stockCount;
};

export default getStockCount;
