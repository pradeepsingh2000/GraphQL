import { gql } from "@apollo/client";

export const GET_ALL_TRANSACTION = gql`
  query GetALlTransaction {
    transactions {
      _id
      userId
      description
      paymentType
      category
      amount
      location
      date
    }
  }
`;

export const GET_TRANSACTION = gql`
  query GetTransaction ($id:ID!) {
    transaction (transactionId:$id) {
      _id
      userId
      description
      paymentType
      category
      amount
      location
      date
    }
  }
`;

export const GET_DASHBORD =gql`
query GetDashbordData {
  dashbord {
    category
    totalAmount
  }
}
`