import { Field, InputType } from 'type-graphql';
import { MaxLength } from 'class-validator';

@InputType()
export class NewWidgetInput {
  @Field()
  @MaxLength(200)
  name: string;

  @Field()
  userId: number;
}
