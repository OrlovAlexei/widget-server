import { Column, Entity } from 'typeorm';

import { AbstractEntity } from '../abstract/entity';

@Entity()
export class Answer extends AbstractEntity {
  @Column()
  questionId: number;

  @Column()
  value: string;
}

export type AnswerType = 'Closed';
