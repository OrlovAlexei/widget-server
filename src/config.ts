import * as TypeORM from "typeorm";
import {Container} from "typedi";
import {customAuthChecker} from "./auth/auth-checker";
import {BuildSchemaOptions} from "type-graphql";

export const config: IConfig = {
    db: {
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
    },

    gqlSchema: {
        resolvers: [`${__dirname}/**/resolver.ts`],
        container: Container,
        authChecker: customAuthChecker
    },

    jwt: {
        secret: 'Hf$1231fse8a'
    }
};

export interface IConfig {
    db: TypeORM.ConnectionOptions,
    gqlSchema: BuildSchemaOptions,
    jwt: any
}
