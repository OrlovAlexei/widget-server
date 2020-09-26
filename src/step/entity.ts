import { Column, Entity, Index,ManyToOne, OneToMany } from 'typeorm';

import { AbstractEntity } from '../abstract/entity';
import { Question } from '../question/entity';
import { Widget } from '../widget/entity';

export enum StepType {
  Question,
  Finish,
}

@Entity()
@Index('uidxStepIndex', ['widgetId', 'index'], { unique: true })
export abstract class Step extends AbstractEntity {
  @Column()
  widgetId: number;

  @Column()
  name: string;

  @Column()
  index: number;

  @Column()
  text: string;

  @ManyToOne(() => Widget, (widget) => widget.steps)
  widget: Widget;

  @OneToMany(() => Question, (question) => question.step, {
    cascade: false,
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  questions: Question[];
}
