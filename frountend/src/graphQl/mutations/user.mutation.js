import { gql } from "@apollo/client";

export const SIGN_UP = gql`
  mutation signUp($input: SingUpInput!) {
    signUp(input: $input) {
      _id
      name
      username
    }
  }
`;

export const LOGIN = gql`
  mutation login($input: LoginInput!) {
    login(input: $input) {
      _id
      name
      username
      profilePicture
      gender
    }
  }
`;

export const LOGOUT = gql`
  mutation logout {
    logout {
      message
    }
  }
`;
