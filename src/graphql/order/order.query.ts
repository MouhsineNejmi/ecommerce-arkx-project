import { gql } from "@apollo/client";

export const GET_ORDERS = gql`
  query getAllOrders($where: order_bool_exp!) {
    order(where: $where) {
      id
      order_items
      address
      phone
      status
      store_id
      created_at
    }
  }
`;

export const GET_ORDER_ITEMS = gql`
  query getOrderItems($where: order_item_bool_exp!) {
    order_item(where: $where) {
      id
      product {
        name
        price
      }
      quantity
    }
  }
`;
