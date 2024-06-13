import { gql } from "@apollo/client";

export const GET_CATEGORIES = gql`
  query getAllCategories($where: category_bool_exp!) {
    category(where: $where) {
      id
      name
      store_id
      billboard_id
      created_at
      billboard {
        id
        label
      }
    }
  }
`;
