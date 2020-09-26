import { Roles } from '../roles/roles';

export class JwtUser {
  constructor(
    public readonly id: number,
    public readonly roles: Roles[] = [Roles.USER],
  ) { }
}
