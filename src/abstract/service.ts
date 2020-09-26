import { DeepPartial, FindManyOptions, FindOneOptions, Repository } from 'typeorm';

import { AbstractEntity } from './entity';

export abstract class AbstractService<T extends AbstractEntity> {
  protected abstract readonly repository: Repository<T>;

  public async find(options: FindManyOptions<T>): Promise<T[]> {
    return this.fetch(options);
  }

  public async findById(id: number | string, relations: string[] = []): Promise<T> {
    return this.fetchOne({ where: { id }, relations });
  }

  async save(entity: DeepPartial<T>): Promise<T> {
    return await this.repository.save(entity);
  }

  protected async fetchOne(options: FindOneOptions<T>): Promise<T | undefined> {
    const result = await this.fetch(options);

    return result[0];
  }

  protected async fetch(options: FindManyOptions<T>): Promise<T[]> {
    const entities = await this.repository.find(options);

    const result: T[] = [];

    for (const entity of entities) {
      result.push(await this.loadLine(entity));
    }

    return result;
  }

  protected async loadLine(entity: T): Promise<T> {
    return await new Promise(() => entity)
  }
}
