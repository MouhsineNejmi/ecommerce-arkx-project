import { gql } from "@apollo/client";

export const GET_STORE_BY_ID = `
  query getStore($id: uuid!) {
    store_by_pk(id: $id) {
      id
      name
      user_id
      created_at
      updated_at
    }
  }
`;

export const GET_USER_STORES = gql`
  query getAllStores($where: store_bool_exp, $order_by: [store_order_by!]) {
    store(where: $where, order_by: $order_by) {
      id
      name
      user_id
    }
  }
`;

export const GET_USER_CURRENT_STORE = gql`
  query getStoreById($where: store_bool_exp) {
    store(where: $where) {
      id
      name
    }
  }
`;
