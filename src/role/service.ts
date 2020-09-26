import { Service } from 'typedi';
import { getRepository } from 'typeorm';

import { AbstractService } from '../abstract/service';

import { Role } from './entity';

@Service()
export class RoleService extends AbstractService<Role> {
  protected readonly repository = getRepository(Role);
}
