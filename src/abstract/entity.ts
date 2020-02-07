import {PrimaryGeneratedColumn} from 'typeorm';
import {Field, ID } from "type-graphql";

export abstract class AbstractEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number;
}
