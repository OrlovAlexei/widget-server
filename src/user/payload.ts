import { createUnionType, Field, ObjectType } from 'type-graphql';

import { AbstractPayload } from '../abstract/payload';
import { Roles } from '../roles/roles';

import { User } from './entity';

@ObjectType()
export class UserPayload extends AbstractPayload {
  constructor(user: User) {
    super(user);

    this.id = user.id;
    this.email = user.email;
    this.role = user.role;
    this.token = user.token;
  }

  @Field()
  email: string;

  @Field()
  token: string;

  @Field(() => Roles)
  role: Roles;
}

@ObjectType()
export class UserNotFoundProblem {
  @Field(() => String)
  public message = 'No user with such email address was found.';
}

@ObjectType()
export class WrongPasswordProblem {
  @Field(() => String)
  public message = 'Wrong password.';
}

@ObjectType()
export class EmailBusyProblem {
  @Field(() => String)
  message = 'User with such email already exists.';
}


export const QueryUserType = createUnionType({
  name: 'QueryUserType',

  description: 'User or problems witch query',

  types: () => [UserPayload, EmailBusyProblem],

  resolveType: (value) => {
    switch (true) {
      case value instanceof UserPayload:
        return UserPayload;
      case value instanceof EmailBusyProblem:
        return EmailBusyProblem;
      default:
        return null;
    }
  },
});

export const UserRegisterType = createUnionType({
  name: 'UserRegisterType',

  description: 'User or problems witch registration',

  types: () => [UserPayload, EmailBusyProblem],

  resolveType: (value) => {
    switch (true) {
      case value instanceof UserPayload:
        return UserPayload;
      case value instanceof EmailBusyProblem:
        return EmailBusyProblem;
      default:
        return null;
    }
  },
});

export const UserLoginType = createUnionType({
  name: 'UserLoginType',

  description: 'User or problems witch login',

  types: () => [UserPayload, UserNotFoundProblem, WrongPasswordProblem],

  resolveType: (value) => {
    switch (true) {
      case value instanceof UserPayload:
        return UserPayload;
      case value instanceof UserNotFoundProblem:
        return UserNotFoundProblem;
      case value instanceof WrongPasswordProblem:
        return WrongPasswordProblem;
      default:
        return null;
    }
  },
});
