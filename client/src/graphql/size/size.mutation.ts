import { gql } from "@apollo/client";

export const CREATE_SIZE = gql`
  mutation createSize($object: size_insert_input!) {
    insert_size_one(object: $object) {
      id
      name
      value
      store_id
    }
  }
`;

export const EDIT_SIZE = gql`
  mutation editSize($_set: size_set_input, $where: size_bool_exp!) {
    update_size(_set: $_set, where: $where) {
      returning {
        id
        name
        value
        store_id
      }
    }
  }
`;

export const DELETE_SIZE = gql`
  mutation deleteSize($where: size_bool_exp!) {
    delete_size(where: $where) {
      returning {
        id
      }
    }
  }
`;
