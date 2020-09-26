import "reflect-metadata";
import * as express from "express";
import { buildSchema } from "type-graphql";
import { ApolloServer } from "apollo-server-express";
import * as TypeORM from "typeorm";
import * as jwt from "express-jwt";
import { GraphQLSchema } from "graphql";
import { Request, Response } from "express";
import { IConfig, config } from "./config";
import { JwtUser } from "./jwt/user";
import { Container } from "typedi";
import { JwtService } from "./jwt/service";
import { UserService } from "./user/service";
import { User } from "./user/entity";

export interface IContext {
  req: Request,
  res: Response,
  currentUser: User
}

const main = async () => {

  try {
    await TypeORM.createConnection(config.db);

    const schema = await buildSchema(config.gqlSchema);

    initServer(schema, config);
  } catch (e) {
    console.error(e);
  }
};

const initServer = (schema: GraphQLSchema, config: IConfig) => {
  const app = express();
  const path = "/";

  const apolloServer = new ApolloServer({
    schema,
    playground: true,
    context: async (context): Promise<IContext> => {
      const jwtService = Container.get(JwtService);

      const token = context.req.header('Authorization');

      let jwtUser: JwtUser | boolean = false;

      if (token) {
        jwtUser = jwtService.verify(token.split(' ')[1], config.jwt.secret);
      }

      let user;

      if (jwtUser === false) {
        user = new User();
      } else {
        const userService = Container.get(UserService);
        user = await userService.findById(jwtUser.id)
      }

      return {
        ...context,
        currentUser: user
      };
    },
  });

  // Mount a jwt or other authentication middleware that is run before the GraphQL execution
  app.use(
    path,
    jwt({
      secret: config.jwt.secret,
      credentialsRequired: false,
    }),
  );

  // Apply the GraphQL server middleware
  apolloServer.applyMiddleware({ app, path });

  app.listen({ port: 4000 });

  // tslint:disable-next-line: no-console
  console.log(`Server is running, GraphQL Playground available at http://localhost:4000`);
};

main();
