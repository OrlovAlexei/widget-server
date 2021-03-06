import { Column, Entity, OneToMany } from 'typeorm';

import { AbstractEntity } from '../abstract/entity';
import { Step } from '../step/entity';

@Entity()
export class Widget extends AbstractEntity {
  @Column({ length: 300 })
  name: string;

  @Column()
  userId: number;

  @Column({ default: false })
  pinned: boolean;

  @OneToMany(() => Step, (step) => step.widget, {
    cascade: false,
    onDelete: 'RESTRICT',
    onUpdate: 'NO ACTION',
  })
  steps: Step[];
}
