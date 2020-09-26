import { Column, Entity, Unique } from 'typeorm';

import { AbstractEntity } from '../abstract/entity';
import { Roles } from '../roles/roles';

@Entity()
@Unique('uidx_user_email', ['email'])
export class User extends AbstractEntity {
  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  token?: string;

  @Column({ default: Roles.USER })
  role: Roles;
}
