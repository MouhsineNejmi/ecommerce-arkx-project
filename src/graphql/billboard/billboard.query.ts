import { gql } from "@apollo/client";

export const GET_BILLBOARDS = gql`
  query getAllBillboards($where: billboard_bool_exp) {
    billboard(where: $where) {
      id
      label
      image_url
      store_id
      created_at
    }
  }
`;

export const GET_BILLBOARD = gql`
  query getBillboard($id: uuid!) {
    billboard_by_pk(id: $id) {
      id
      label
      image_url
      store_id
    }
  }
`;
