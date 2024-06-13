import { gql } from "@apollo/client";

export const CREATE_STORE = gql`
  mutation createStore($object: store_insert_input!) {
    insert_store_one(object: $object) {
      id
      name
    }
  }
`;

export const EDIT_STORE = gql`
  mutation editStore($_set: store_set_input, $where: store_bool_exp!) {
    update_store(_set: $_set, where: $where) {
      returning {
        id
        name
      }
    }
  }
`;

export const DELETE_STORE = gql`
  mutation deleteStore($where: store_bool_exp!) {
    delete_store(where: $where) {
      returning {
        id
      }
    }
  }
`;
