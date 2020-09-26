import { Field, ID, ObjectType } from 'type-graphql';
import { PrimaryGeneratedColumn } from 'typeorm';

import { IDomainItem } from './interfaces';

@ObjectType()
export abstract class AbstractEntity implements IDomainItem {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;
}
