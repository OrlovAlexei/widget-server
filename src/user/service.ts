import {getRepository, Repository} from "typeorm";
import {User} from "./entity";
import {Service} from "typedi";

@Service()
export class UserService {
    private readonly repository = getRepository(User);

    findOne(id: number) : Promise<User> {
        return this.repository.findOne(id);
    }
}
