import { MaxLength } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export class NewWidgetInput {
  @Field()
  @MaxLength(200)
  name: string;

  @Field()
  userId: number;
}
