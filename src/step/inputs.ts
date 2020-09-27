import { Field, InputType } from "type-graphql";


@InputType()
export class StepInput {

  @Field()
  name: string

  @Field()
  text: string
}
