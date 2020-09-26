import { Roles } from '../rbac/roles';
import { Role } from '../role/entity';

export class JwtUser {
  constructor(
    public readonly id: number,
    public readonly roles: Role[] = [new Role(Roles.GUEST)],
  ) {}
}
