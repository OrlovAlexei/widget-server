import { DeepPartial, FindManyOptions, FindOneOptions as FindOneOption, Repository } from 'typeorm';

import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

import { AbstractEntity } from './entity';

export abstract class AbstractService<T extends AbstractEntity> {
  protected abstract readonly repository: Repository<T>;

  public async find(options: FindManyOptions<T>): Promise<T[]> {
    return await this.repository.find(options)
  }

  public async findOne(options: FindOneOption<T>): Promise<T> {
    return await this.repository.findOne(options)
  }

  public async findById(id: number | string, relations: string[] = []): Promise<T> {
    return await this.findOne({ where: { id }, relations });
  }

  async save(entity: DeepPartial<T>): Promise<T> {
    return await this.repository.save(entity);
  }

  async update(id: number, entity: QueryDeepPartialEntity<T>): Promise<T> {
    await this.repository.update(id, entity)
    return await this.findOne({ where: { id } })
  }
}