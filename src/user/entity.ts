import {AbstractEntity} from '../abstract/entity';
import {Column, Entity, Unique} from 'typeorm';
import { Role } from '../role/entity';
import { Roles } from '../rbac/roles';

@Entity()
@Unique('uidx_user_email', ['email'])
export class User extends AbstractEntity {
    @Column()
    email: string;

    @Column()
    password: string;

    @Column({nullable: true})
    token?: string;

    roles: Role[] = [new Role(Roles.GUEST)];
}
