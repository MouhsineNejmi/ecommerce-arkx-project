import { gql } from "@apollo/client";

export const CREATE_BILLBOARD = gql`
  mutation createBillboard($object: billboard_insert_input!) {
    insert_billboard_one(object: $object) {
      id
      label
      image_url
    }
  }
`;

export const EDIT_BILLBOARD = gql`
  mutation editBillboard(
    $_set: billboard_set_input
    $where: billboard_bool_exp!
  ) {
    update_billboard(_set: $_set, where: $where) {
      returning {
        id
        label
        image_url
      }
    }
  }
`;

export const DELETE_BILLBOARD = gql`
  mutation deleteBillboard($where: billboard_bool_exp!) {
    delete_billboard(where: $where) {
      returning {
        id
      }
    }
  }
`;
