import {Column, Entity, ManyToOne} from 'typeorm';
import {Order} from '../order/entity';
import {AbstractEntity} from '../abstract/entity';
import {StepType} from "../step/entity";
import {Field, ID, ObjectType, Resolver} from "type-graphql";

@Entity()
@ObjectType()
export class Widget extends AbstractEntity {
    @Field()
    @Column({length: 300})
    name: string;

    @Field(() => ID)
    @Column()
    userId: number;

    stepsMap: Order<StepType>;
}

