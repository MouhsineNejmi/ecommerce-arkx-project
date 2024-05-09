import { gql } from "@apollo/client";

export const CREATE_CATEGORY = gql`
  mutation createCategory($object: category_insert_input!) {
    insert_category_one(object: $object) {
      id
      name
      store_id
    }
  }
`;

export const EDIT_CATEGORY = gql`
  mutation editCategory($_set: category_set_input, $where: category_bool_exp!) {
    update_category(_set: $_set, where: $where) {
      returning {
        id
        name
        store_id
      }
    }
  }
`;

export const DELETE_CATEGORY = gql`
  mutation deleteCategory($where: category_bool_exp!) {
    delete_category(where: $where) {
      returning {
        id
      }
    }
  }
`;
