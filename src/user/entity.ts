import {AbstractEntity} from '../abstract/entity';
import {Column, Entity, Unique} from 'typeorm';
import {createUnionType, Field, ObjectType} from "type-graphql";
import { Roles } from 'rbac/roles';

@Entity()
@Unique('uidx_user_email', ['email'])
export class User extends AbstractEntity {
    @Column()
    email: string;

    @Column()
    password: string;

    @Column({nullable: true})
    token?: string;

    roles: Roles[] = [Roles.USER];
}
