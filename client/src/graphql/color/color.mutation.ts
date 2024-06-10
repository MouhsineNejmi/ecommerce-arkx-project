import { gql } from "@apollo/client";

export const CREATE_COLOR = gql`
  mutation createColor($object: color_insert_input!) {
    insert_color_one(object: $object) {
      id
      name
      value
      store_id
    }
  }
`;

export const EDIT_COLOR = gql`
  mutation editColor($_set: color_set_input, $where: color_bool_exp!) {
    update_color(_set: $_set, where: $where) {
      returning {
        id
        name
        value
        store_id
      }
    }
  }
`;

export const DELETE_COLOR = gql`
  mutation deleteColor($where: color_bool_exp!) {
    delete_color(where: $where) {
      returning {
        id
      }
    }
  }
`;
