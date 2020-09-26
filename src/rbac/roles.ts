import { registerEnumType } from 'type-graphql';

export enum Roles {
  USER = 'user',
  ADMIN = 'admin',
  GUEST = 'guest',
}

registerEnumType(Roles, {
  name: 'Roles',
  description: 'User roles enum',
});
