import { gql } from "@apollo/client";

export const GET_USER_BY_EMAIL = gql`
  query GetUserByEmail($where: user_bool_exp) {
    user(where: $where) {
      email
      password
    }
  }
`;
