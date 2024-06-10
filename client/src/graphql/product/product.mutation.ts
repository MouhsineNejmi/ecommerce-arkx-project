import { gql } from "@apollo/client";

export const CREATE_PRODUCT = gql`
  mutation createProduct($object: product_insert_input!) {
    insert_product_one(object: $object) {
      id
      name
      description
    }
  }
`;

export const EDIT_PRODUCT = gql`
  mutation editProduct($_set: product_set_input, $where: product_bool_exp!) {
    update_product(_set: $_set, where: $where) {
      returning {
        id
        name
        description
      }
    }
  }
`;

export const DELETE_PRODUCT = gql`
  mutation deleteProduct($where: product_bool_exp!) {
    delete_product(where: $where) {
      returning {
        id
      }
    }
  }
`;
