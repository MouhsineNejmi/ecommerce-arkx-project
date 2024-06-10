import { gql } from "@apollo/client";

export const CREATE_ORDER = gql`
  mutation createOrder($object: order_insert_input!) {
    insert_order_one(object: $object) {
      id
      status
    }
  }
`;

export const CREATE_ORDER_ITEMS = gql`
  mutation createOrderItems($objects: [order_item_insert_input!]!) {
    insert_order_item(objects: $objects) {
      returning {
        id
        product_id
        quantity
        order_id
      }
    }
  }
`;
