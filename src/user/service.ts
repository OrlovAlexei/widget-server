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
    return await this.findOne({ where: { email } });
  }

  async create(regUserInput: RegUserInput): Promise<User> {
    const newUser = this.repository.create(regUserInput);


    newUser.token = this.jwtService.generate(
      { id: newUser.id, roles: newUser.role },
      config.jwt.secret,
    );

    return await this.repository.save(newUser);
  }

}
