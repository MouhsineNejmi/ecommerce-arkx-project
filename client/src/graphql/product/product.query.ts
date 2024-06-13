import { gql } from "@apollo/client";

export const GET_PRODUCTS = gql`
  query getAllProducts($where: product_bool_exp!) {
    product(where: $where) {
      id
      name
      description
      price
      is_featured
      is_archived
      store_id
      images
      category {
        id
        name
      }
      created_at
    }
  }
`;
