import {PrimaryGeneratedColumn} from 'typeorm';
import {Field, ID, ObjectType } from "type-graphql";

@ObjectType()
export abstract class AbstractEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number;
}
