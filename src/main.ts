import "reflect-metadata";
import * as express from "express";
import {buildSchema} from "type-graphql";
import {ApolloServer} from "apollo-server-express";
import * as TypeORM from "typeorm";
import * as jwt from "express-jwt";
import {GraphQLSchema} from "graphql";
import {Request, Response} from "express";
import {config} from "./config";

export interface IContext {
    req: Request,
    res: Response
}

const main = async () => {
    try {
        await TypeORM.createConnection(config.db);

        const schema = await buildSchema(config.gqlSchema);

        initServer(schema);
    } catch (e) {
        console.error(e);
    }
};

const initServer = (schema: GraphQLSchema) => {
    const app = express();
    const path = "/";

    const apolloServer = new ApolloServer({
        schema,
        playground: true,
        context: (context) : IContext => {
            return context;
        },
    });

    // Mount a jwt or other authentication middleware that is run before the GraphQL execution
    app.use(
        path,
        jwt({
            secret: "TypeGraphQL",
            credentialsRequired: false,
        }),
    );

    // Apply the GraphQL server middleware
    apolloServer.applyMiddleware({ app, path });

    app.listen({port: 4000});

    // tslint:disable-next-line: no-console
    console.log(`Server is running, GraphQL Playground available at http://localhost:4000`);
};

main();
