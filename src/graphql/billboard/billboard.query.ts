import { gql } from "@apollo/client";

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
