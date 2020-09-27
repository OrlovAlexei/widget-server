import { Field, ID, ObjectType } from 'type-graphql';

import { AbstractPayload } from '../abstract/payload';
import { StepPayload } from '../step/payload';

import { Widget } from './entity';

@ObjectType()
export class WidgetPayload extends AbstractPayload {
  constructor(widget: Widget) {
    super(widget);

    this.id = widget.id;
    this.name = widget.name;
    this.userId = widget.userId;
    this.steps = widget.steps
  }

  @Field()
  name: string;

  @Field(() => ID)
  userId: number;

  @Field(() => [StepPayload])
  steps: StepPayload[];
}
