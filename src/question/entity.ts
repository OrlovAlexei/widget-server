import { Column, Entity, ManyToOne } from 'typeorm';
import { AbstractEntity } from '../abstract/entity';
import { Step } from '../step/entity';

@Entity()
export class Question extends AbstractEntity {
  @Column()
  stepId: number;

  @Column()
  orderId: number;

  @Column()
  value: string;

  @ManyToOne((type) => Step, (step) => step.questions)
  step: Step;
}
