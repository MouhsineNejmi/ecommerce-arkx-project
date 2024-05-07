import { gql } from "@apollo/client";

export const CREATE_STORE = gql`
  mutation createStore($object: store_insert_input!) {
    insert_store_one(object: $object) {
      id
      name
    }
  }
`;
