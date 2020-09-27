import { MaxLength } from 'class-validator';
import { Field, InputType } from 'type-graphql';

import { StepInput } from '../step/inputs';

@InputType()
export class NewWidgetInput {
  @Field()
  @MaxLength(200)
  name: string;

  @Field(() => [StepInput], { nullable: true })
  steps: StepInput[]

  get hasStep(): boolean {
    return this.steps.length > 0
  }
}
