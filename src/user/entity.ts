import {AbstractEntity} from '../abstract/entity';
import {Column, Entity, Unique} from 'typeorm';
import {Authorized, Field, ObjectType} from "type-graphql";

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
