import { ApolloServer } from "@apollo/server";
import mergedResolvers from "./resolvers/index.js";
import mergeTypeDefs from "./typeDefs/index.js";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import connectDB from "./Db/connect.js";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";
import http from "http";
import express from "express";
import dotenv from "dotenv";
import passport from "passport";
import session from "express-session";
import connectMongo from "connect-mongodb-session";
import {  buildContext } from "graphql-passport";

dotenv.config();
const app = express();
const httpServer = http.createServer(app);

const MongoDbStore = connectMongo(session)
const store = new MongoDbStore( {
  uri: process.env.MONGO_URI,
  collection: "sessions"
})

store.on("error", (err) => console.log(err))

app.use(
  session( {
    secret:process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized:false,
    cookie: {
      maxAge : 1000 * 60 * 60 * 24 * 7,
      httpOnly : true
    },
    store:store
  })
)

app.use(passport.initialize())
app.use(passport.session())

const server = new ApolloServer({
  typeDefs: mergeTypeDefs,
  resolvers: mergedResolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});
await server.start();

app.use(
  "/",
  cors("*"),
  express.json(),
  expressMiddleware(server, {
    context: async ({ req,res }) => buildContext({ req ,res}),
  })
);

await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
connectDB();
console.log(`🚀 Server ready at http://localhost:4000`);
