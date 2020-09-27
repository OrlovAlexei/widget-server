import { Field, ID, ObjectType } from 'type-graphql';

import { AbstractPayload } from '../abstract/payload';

import { Step } from './entity';

@ObjectType()
export class StepPayload extends AbstractPayload {
  constructor(step: Step) {
    super(step);

    this.widgetId = step.widgetId;
    this.name = step.name;
    this.text = step.text;
  }

  @Field(() => ID)
  widgetId: number;

  @Field()
  name: string;

  @Field()
  text: string;

}
