
import "reflect-metadata"


import { __prod__, COOKIE_NAME } from "./constants";

import express from "express";
import connectRedis from "connect-redis";
import session from "express-session";
import Redis from "ioredis";
import cors from "cors";
import { buildSchema } from "type-graphql";
import { ApolloServer } from "apollo-server-express";

import { AppDataSource } from "./data-source";
import { TestResolver } from "./resolvers/test";
import { UserResolver } from "./resolvers/user";
import { CompanyResolver } from './resolvers/company';
import { DataFileResolver } from './resolvers/datafile';
import { DataGroupResolver } from './resolvers/datagroup';



const main = async () => {

  AppDataSource
  .initialize()
  .then(() => {
      console.log("Data Source has been initialized!")
  })
  .catch((err) => {
      console.error("Error during Data Source initialization:", err)
  })
  const app = express();


  


  const RedisStore = connectRedis(session);
  const redis = new Redis("redis://:devpassword@localhost:6379/0");
  app.set("trust proxy", 1); //
  app.use(
    cors({
      origin: process.env.CORS_ORIGIN,
      credentials: true,
    })
  );

  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );

  app.use(express.static('static'))


  app.use(
    session({
      name: COOKIE_NAME,
      store: new RedisStore({
        client: redis,
        disableTouch: true,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
        httpOnly: true,
        sameSite: "lax", // csrf
        secure: __prod__, // cookie only works in https
        domain: __prod__ ? ".pilotr.io" : undefined,
      },
      saveUninitialized: false,
      secret: "keyboard cat",
      resave: false,
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [TestResolver, UserResolver, CompanyResolver,DataFileResolver, DataGroupResolver],
      validate: false,
    }),
    context: ({ req, res }) => ({ req, res, redis }),
  });

  apolloServer.applyMiddleware({
    app,
    cors: false,
  });

  app.listen(4000, () => {
    console.log("server started on localhost:4000");
  });

};


main().catch((err) => {
  console.error(err);
});




