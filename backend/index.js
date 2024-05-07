import { ApolloServer } from "@apollo/server"
import { startStandaloneServer } from "@apollo/server/standalone"
 import mergedResolvers from "./resolvers/index.js"
 import mergeTypeDefs from "./typeDefs/index.js"
 
const server = new ApolloServer({
  typeDefs :mergeTypeDefs,
  resolvers:mergedResolvers,
 
})
 
const { url } = await startStandaloneServer(server)
 
console.log(`🚀 Server ready at ${url}`)