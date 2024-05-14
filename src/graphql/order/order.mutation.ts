import { gql } from "@apollo/client";

export const CREATE_ORDER = gql`
  mutation createOrder($object: order_insert_input!) {
    insert_order_one(object: $object) {
      id
      status
    }
  }
`;
