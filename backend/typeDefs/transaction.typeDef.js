const transactionTypeDef = `#graphql
scalar Date

type Transaction {
    _id : ID!
    userId : ID!
    description: String!
    paymentType: String!
    category: String!
    amount: Float!
    location: String
    date: Date!
}


type Query {
    transactions: [Transaction!]
    transaction(transactionId:ID!): Transaction  
    dashbord: [DashboardData!]
}
type DashboardData {
    category: String!
    totalAmount :Float!
}

type Mutation {
    createTransaction(input:CreateTransactionInput!): Transaction!
    updateTransaction(input : UpdateTransactionInput!): Transaction!
    deleteTransaction(transactionId:ID!): Transaction!
}

input CreateTransactionInput {
    description: String!
    paymentType: String!
    category: String!
    amount: Float!
    location: String
    date: String!
}


input UpdateTransactionInput {
    transactionId: ID!
    description: String
    paymentType: String
    category: String
    amount: Float
    location: String
    date: String
}
`

export default transactionTypeDef;