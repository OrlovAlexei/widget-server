import { MaxLength } from 'class-validator';
import { Field, InputType } from 'type-graphql';

import { NewStepInput } from '../step/inputs';

@InputType()
export class NewWidgetInput {
  @Field()
  @MaxLength(200)
  name: string;

  @Field(() => [NewStepInput], { nullable: true })
  steps: NewStepInput[]

  get hasStep(): boolean {
    return this.steps.length > 0
  }
}
