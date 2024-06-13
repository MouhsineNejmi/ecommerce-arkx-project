export const SIGNUP_USER = `
  mutation CreateUser($object: user_insert_input!) {
    insert_user_one(object: $object) {
      id
    }
  }
`;
