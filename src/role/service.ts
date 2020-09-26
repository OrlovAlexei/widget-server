import { Service } from 'typedi';
import { getRepository } from 'typeorm';
import { Role } from './entity';
import { AbstractService } from '../abstract/service';

@Service()
export class RoleService extends AbstractService<Role> {
  protected readonly repository = getRepository(Role);
}
