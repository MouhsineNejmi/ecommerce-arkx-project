import { Order } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_HASURA_GRAPHQL_ENDPOINT}`;

const getOrders = async (storeId: string) => {
  const res = await fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-hasura-admin-secret": process.env
        .NEXT_PUBLIC_HASURA_ADMIN_SECRET as string,
    },
    body: JSON.stringify({
      query: `
        query getSalesRevenue($where: order_bool_exp!) {
          order(where: $where) {
            id
            amount
            address
            phone
            status
            store_id
            created_at
          }
        }
      `,
      variables: {
        where: { store_id: { _eq: storeId }, status: { _eq: "succeeded" } },
      },
    }),
  });

  const { data } = await res.json();
  const paidOrders = data?.order;

  const enrichedOrders = await Promise.all(
    paidOrders?.map(async (order: Order) => {
      const enrichedResponse = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-hasura-admin-secret": process.env
            .NEXT_PUBLIC_HASURA_ADMIN_SECRET as string,
        },
        body: JSON.stringify({
          query: `
            query getOrderItem($where: order_item_bool_exp!) {
              order_item(where: $where) {
                id
                order_id
                quantity
                product_id
                created_at
                product {
                  id
                  name
                  price
                }
              }
            }
          `,
          variables: {
            where: { order_id: { _eq: order.id } },
          },
        }),
      });

      const { data } = await enrichedResponse.json();
      const orderItems = data.order_item;

      return {
        ...order,
        items: [...orderItems],
      };
    })
  );

  return enrichedOrders;
};

export default getOrders;
