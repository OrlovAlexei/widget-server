import {Column, Entity, TableInheritance} from 'typeorm';
import {AbstractEntity} from '../abstract/entity';

export enum StepType {
    Question,
    Finish,
}

@Entity()
@TableInheritance({column: {type: 'enum', enum: StepType, name: 'type'}})
export abstract class Step extends AbstractEntity {
    @Column()
    widgetId: number;

    @Column()
    name: string;

    @Column()
    text: string;
}
