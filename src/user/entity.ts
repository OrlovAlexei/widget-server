import { Column, Entity, Unique } from 'typeorm';

import { AbstractEntity } from '../abstract/entity';
import { Roles } from '../rbac/roles';
import { Role } from '../role/entity';

@Entity()
@Unique('uidx_user_email', ['email'])
export class User extends AbstractEntity {
  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  token?: string;

  roles: Role[] = [new Role(Roles.GUEST)];
}
