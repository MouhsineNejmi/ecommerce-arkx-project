const URL = `${process.env.NEXT_PUBLIC_HASURA_GRAPHQL_ENDPOINT}`;

const getSalesCount = async (storeId: string): Promise<number> => {
  const res = await fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-hasura-admin-secret": process.env
        .NEXT_PUBLIC_HASURA_ADMIN_SECRET as string,
    },
    body: JSON.stringify({
      query: `
        query getSalesCount($where: order_bool_exp!) {
          order_aggregate(where: $where) {
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
  const salesCount = data?.order_aggregate.aggregate.count;

  return salesCount;
};

export default getSalesCount;
