import {createUnionType, Field, ObjectType} from "type-graphql";
import { Roles } from "../rbac/roles";
import { User } from "./entity";
import { UserRole } from "../user_role/entity";
import { Role } from "../role/entity";
import { Token } from "typedi";

@ObjectType()
export class UserPayload {
    public static create(user: User) : UserPayload {
        const instance = new UserPayload();

        instance.id    = user.id;
        instance.email = user.email;
        instance.roles = user.roles;
        instance.token = user.token;

        return instance;
    }

    @Field()
    id: number;

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
    public email: string;

    @Field()
    public message: string = 'No user with such email address was found.';
}

@ObjectType()
export class WrongPasswordProblem {
    @Field()
    public message: string = 'Wrong password.';
}

export const UserResultType = createUnionType({
    name: 'UserResultType',

    description: 'User or problems',

    types: () => [
        UserPayload,
        UserNotFoundProblem,
        WrongPasswordProblem
    ],

    resolveType: value => {
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
    }
});