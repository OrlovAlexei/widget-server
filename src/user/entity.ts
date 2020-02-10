import {AbstractEntity} from '../abstract/entity';
import {Column, Entity, Unique} from 'typeorm';
import {createUnionType, Field, ObjectType} from "type-graphql";

@ObjectType()
@Entity()
@Unique('uidx_user_email', ['email'])
export class User extends AbstractEntity {
    @Field()
    @Column()
    email: string;

    @Field()
    @Column()
    password: string;

    @Column({nullable: true})
    token?: string;

    roles: string[] = ['user'];
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
        User,
        UserNotFoundProblem
    ],

    resolveType: value => {
        switch (true) {
            case value instanceof User:
                return User;
            case value instanceof UserNotFoundProblem:
                return UserNotFoundProblem;
            default:
                return null;
        }
    }
});
