import {Column, Entity, TableInheritance, ManyToOne} from 'typeorm';
import {AbstractEntity} from '../abstract/entity';
import { Widget } from '../widget/entity';

export enum StepType {
    Question,
    Finish,
}

@Entity()
export abstract class Step extends AbstractEntity {
    @Column()
    widgetId: number;

    @Column()
    name: string; 

    @Column()
    text: string;

    @ManyToOne(type => Widget, widget => widget.steps)
    widget: Widget;
}
