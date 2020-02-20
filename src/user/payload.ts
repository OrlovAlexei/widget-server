import {createUnionType, Field, ObjectType} from "type-graphql";
import { Roles } from "../rbac/roles";
import { User } from "./entity";
import { UserRole } from "../user_role/entity";
import { Role } from "../role/entity";

@ObjectType()
export class UserPayload {
    public static create(user: User) : UserPayload {
        const instance = new UserPayload();

        instance.id    = user.id;
        instance.email = user.email;
        instance.roles = user.roles;

        return instance;
    }

    @Field()
    id: number;

    @Field()
    email: string;

    @Field(() => [Role])
    roles: Role[] = [];
}

@ObjectType()
export class UserNotFoundProblem {
    @Field()
    public email: string;
}

export const UserResultType = createUnionType({
    name: 'UserResultType',

    description: 'User or problems',

    types: () => [
        UserPayload,
        UserNotFoundProblem
    ],

    resolveType: value => {
        switch (true) {
            case value instanceof UserPayload:
                return UserPayload;
            case value instanceof UserNotFoundProblem:
                return UserNotFoundProblem;
            default:
                return null;
        }
    }
});