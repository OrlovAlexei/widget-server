import { AbstractEntity } from './entity';
import { Field, ID, ObjectType } from 'type-graphql';
import { IDomainItem } from './interfaces';

@ObjectType()
export abstract class AbstractPayload implements IDomainItem {
  @Field(() => ID)
  id: number;

  constructor(entity: AbstractEntity) {
    this.id = entity.id;
  }
}
