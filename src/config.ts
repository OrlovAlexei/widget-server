import * as dotenv from 'dotenv'
import { BuildSchemaOptions } from 'type-graphql';
import { Container } from 'typedi';
import * as TypeORM from 'typeorm';

import { customAuthChecker } from './auth/auth-checker';

export interface IConfig {
  db: TypeORM.ConnectionOptions;
  gqlSchema: BuildSchemaOptions;
  jwt: { secret: string };
}

function newConfig(): IConfig {
  dotenv.config();
  return {
    db: {
      type: 'postgres',
      host: process.env.WIDGET_DB_HOST,
      port: 5432,
      schema: 'public',
      database: process.env.WIDGET_DB_DATABASE,
      username: process.env.WIDGET_DB_USERNAME,
      password: process.env.WIDGET_DB_PASS,
      entities: [`${__dirname}/**/entity.ts`],
      cache: false,
      synchronize: true,
    },

    gqlSchema: {
      resolvers: [`${__dirname}/**/resolver.ts`],
      container: Container,
      authChecker: customAuthChecker,
    },

    jwt: {
      secret: process.env.WIDGET_JWT_SECRET,
    },
  };
}

export const config = newConfig();
