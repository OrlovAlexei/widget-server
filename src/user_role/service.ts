import { Service } from "typedi";
import { UserRole } from "./entity";
import { getRepository } from "typeorm";
import { AbstractService } from "../abstract/service";

@Service()
export class UserRoleService extends AbstractService<UserRole> {
    protected readonly repository = getRepository(UserRole);
    
    create(userId: number, roleId: number): UserRole {
        const userRole = new UserRole(userId, roleId);

        return this.repository.create(userRole);
    }

    async findByUserId(userId: number): Promise<UserRole[]> {
        return await this.fetch({where: {userId}});
    }
}