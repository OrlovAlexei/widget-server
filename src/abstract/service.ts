import { AbstractEntity } from "./entity";
import { Repository, FindOneOptions } from "typeorm";

export abstract class AbstractService<T extends AbstractEntity> {
    protected readonly repository: Repository<T>;

    public async findById(id: number | string): Promise<T> {
        return this.fetchOne({where: {id}});
    }

    protected async fetchOne(options: FindOneOptions<T>): Promise<T> {
        const result = await this.fetch(options);

        return result[0];
    }

    protected async fetch(options: FindOneOptions<T>): Promise<T[]> {
        const entities = await this.repository.find(options);

        const result: T[] = [];

        for (const entity of entities) {
            result.push(await this.loadLine(entity));
        }

        return result;
    }

    protected async loadLine(entity: T) : Promise<T> {
        return entity
    } 
}