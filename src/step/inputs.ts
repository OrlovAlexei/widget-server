import { Field, ID, InputType } from "type-graphql";


@InputType()
export class NewStepInput {
  @Field(() => ID)
  widgetId: number;

  @Field()
  name: string

  @Field()
  text: string
}
