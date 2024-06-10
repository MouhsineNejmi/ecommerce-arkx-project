import { gql } from "@apollo/client";

export const GET_COLORS = gql`
  query getAllColors($where: color_bool_exp!) {
    color(where: $where) {
      id
      name
      value
      store_id
      created_at
    }
  }
`;
