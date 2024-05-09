import { gql } from "@apollo/client";

export const GET_SIZES = gql`
  query getAllSizes($where: size_bool_exp!) {
    size(where: $where) {
      id
      name
      value
      store_id
      created_at
    }
  }
`;
