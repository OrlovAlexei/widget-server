import { Service } from "typedi";
import { UserRole } from "./entity";

@Service()
export class UserRoleService {
    create(userId: number, roleId: number): UserRole {
        return null;
    }
}