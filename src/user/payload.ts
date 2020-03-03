import {createUnionType, Field, ObjectType} from "type-graphql";
import { User } from "./entity";
import { Role } from "../role/entity";
import { AbstractPayload } from "../abstract/payload";

@ObjectType()
export class UserPayload extends AbstractPayload {
    constructor(user: User) {
        super(user);

        this.id    = user.id;
        this.email = user.email;
        this.roles = user.roles;
        this.token = user.token;
    }

    @Field()
    email: string;

    @Field()
    token: string;

    @Field(() => [Role])
    roles: Role[] = [];
}

@ObjectType()
export class UserNotFoundProblem {
    @Field()
    public message: string = 'No user with such email address was found.';
}

@ObjectType()
export class WrongPasswordProblem {
    @Field()
    public message: string = 'Wrong password.';
}

@ObjectType()
export class EmailBusyProblem {
    @Field()
    message: string = 'User with such email already exists.';
}

export const UserResultType = createUnionType({
    name: 'UserResultType',

    description: 'User or problems',

    types: () => [
        UserPayload,
        UserNotFoundProblem,
        WrongPasswordProblem,
        EmailBusyProblem
    ],

    resolveType: value => {
        switch (true) {
            case value instanceof UserPayload:
                return UserPayload;
            case value instanceof UserNotFoundProblem:
                return UserNotFoundProblem;
            case value instanceof WrongPasswordProblem:
                return WrongPasswordProblem;
            case value instanceof EmailBusyProblem:
                return EmailBusyProblem;
            default:
                return null;
        }
    }
});