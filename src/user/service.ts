import { Inject, Service } from 'typedi';
import { getRepository } from 'typeorm';

import { AbstractService } from '../abstract/service';
import { config } from '../config';
import { JwtService } from '../jwt/service';

import { User } from './entity';
import { RegUserInput } from './inputs';

@Service()
export class UserService extends AbstractService<User> {
  protected readonly repository = getRepository(User);


  @Inject()
  private readonly jwtService: JwtService;

  async findByEmail(email: string): Promise<User | undefined> {
    return await this.fetchOne({ where: { email } });
  }

  async create(regUserInput: RegUserInput): Promise<User> {
    let newUser = this.repository.create(regUserInput);

    newUser = await this.repository.save(newUser);

    newUser.token = this.jwtService.generate(
      { id: newUser.id, roles: newUser.roles },
      config.jwt.secret,
    );

    return this.repository.save(newUser);
  }

  // protected async loadLine(user: User): Promise<User> {
  //   const userRoles: UserRole[] = await this.userRoleService.findByUserId(user.id);

  //   const roles: Role[] = [];

  //   for (const userRole of userRoles) {
  //     roles.push(await this.roleService.findById(userRole.getRoleId()));
  //   }

  //   user.roles = roles;

  //   return user;
  // }
}
