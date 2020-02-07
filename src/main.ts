import "reflect-metadata";
import {buildSchema} from "type-graphql";
import {ApolloServer} from "apollo-server";
import {RecipeResolver} from "./recipe/resolver";
import * as TypeORM from "typeorm";
import {Container} from "typedi";
import {Widget} from "./widget/entity";
import {WidgetResolver} from "./widget/resolver";

const main = async () => {
    try {
        await TypeORM.createConnection({
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            schema: 'public',
            database: 'widget',
            username: 'max',
            password: 'Bankai123',
            entities: [`${__dirname}/**/entity.ts`],
            cache: false,
            synchronize: true,
        });

        const schema = await buildSchema({
            resolvers: [`${__dirname}/**/resolver.ts`],
            container: Container,
        });

        const apolloServer = new ApolloServer({
            schema,
            playground: true,
        });

        const {url} = await apolloServer.listen(4000);

        // tslint:disable-next-line: no-console
        console.log(`Server is running, GraphQL Playground available at ${url}`);
    } catch (e) {
        console.error(e);
    }
};

main();
