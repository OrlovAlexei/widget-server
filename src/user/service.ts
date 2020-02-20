import {getRepository} from "typeorm";
import {User} from "./entity";
import {Inject, Service} from "typedi";
import {RegUserInput} from "./inputs";
import {JwtService} from "../jwt/service";
import {config} from "../config";
import { AbstractService } from "../abstract/service";
import { UserRoleService } from "../user_role/service";
import { UserRole } from "../user_role/entity";
import { Role } from "../role/entity";
import { RoleService } from "../role/service";

@Service()
export class UserService extends AbstractService<User> {
    protected readonly repository = getRepository(User);

    @Inject()
    private readonly userRoleService: UserRoleService;

    @Inject()
    private readonly roleService: RoleService;

    @Inject()
    private readonly jwtService: JwtService;

    async findByEmail(email: string) : Promise<User> {
        return await this.fetchOne({where: {email}});
    }

    async create(regUserInput: RegUserInput) : Promise<User> {
        let newUser = this.repository.create(regUserInput);

        newUser = await this.repository.save(newUser);

        newUser.token = this.jwtService.generate({id: newUser.id, roles: newUser.roles}, config.jwt.secret);

        return this.repository.save(newUser);
    }

    protected async loadLine(user: User) : Promise<User> {
        const userRoles: UserRole[] = await this.userRoleService.findByUserId(user.id);

        const roles: Role[] = [];

        for (const userRole of userRoles) {
            roles.push(await this.roleService.findById(userRole.getRoleId()));
        }

        user.roles = roles;

        return user;
    }
}
