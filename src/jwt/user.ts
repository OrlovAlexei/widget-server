import { Role } from "../role/entity";
import { Roles } from "../rbac/roles";

export class JwtUser {
    constructor(
        public readonly id: number,
        public readonly roles: Role[] = [new Role(Roles.GUEST)]
    ) {

    }
}
