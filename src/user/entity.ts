import {AbstractEntity} from '../abstract/entity';
import {Column, Entity, Unique} from 'typeorm';
import {Field, ObjectType} from "type-graphql";

@ObjectType()
@Entity()
@Unique('uidx_user_email', ['email'])
export class User extends AbstractEntity {
    @Field()
    @Column()
    email: string;

    @Field()
    @Column()
    username: string;

    @Field()
    @Column()
    password: string;

    roles: string[] = ['user'];
}
