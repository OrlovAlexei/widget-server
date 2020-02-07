import {getRepository} from "typeorm";
import {User} from "./entity";
import {Inject, Service} from "typedi";
import {RegUserInput} from "./inputs";
import {Roles} from "../rbac/roles";
import {JwtService} from "../jwt/service";
import {JwtUser} from "../jwt/user";
import {config} from "../config";

@Service()
export class UserService {
    private readonly repository = getRepository(User);

    @Inject()
    private readonly jwtService: JwtService;

    findOne(id: number) : Promise<User> {
        return this.repository.findOne(id);
    }

    async findByEmail(email: string) : Promise<User> {
        return await this.repository.createQueryBuilder().where("email = :email", {email}).getOne();
    }

    async create(regUserInput: RegUserInput) : Promise<User> {
        let newUser = this.repository.create(regUserInput);

        newUser = await this.repository.save(newUser);

        newUser.roles = [Roles.User];
        newUser.token = this.jwtService.generate({id: newUser.id, roles: newUser.roles}, config.jwt.secret);

        return this.repository.save(newUser);
    }

    async save(user: User) {
        return await this.repository.save(user);
    }
}
