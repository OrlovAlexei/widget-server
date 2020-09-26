import { registerEnumType } from 'type-graphql';

export enum Roles {
  USER = 2,
  ADMIN = 3,
}

registerEnumType(Roles, {
  name: 'Roles',
  description: 'User roles enum',
});
