import { DeepPartial, FindManyOptions, Repository } from 'typeorm';

import { AbstractEntity } from './entity';

export abstract class AbstractService<T extends AbstractEntity> {
  protected abstract readonly repository: Repository<T>;

  public async find(options: FindManyOptions<T>): Promise<T[]> {
    return await this.repository.find(options)
  }

  public async findOne(options: FindManyOptions<T>): Promise<T> {
    return await this.repository.findOne(options)
  }

  public async findById(id: number | string, relations: string[] = []): Promise<T> {
    return await this.findOne({ where: { id }, relations });
  }

  async save(entity: DeepPartial<T>): Promise<T> {
    return await this.repository.save(entity);
  }



}
