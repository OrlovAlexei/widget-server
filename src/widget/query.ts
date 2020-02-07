import {ArgsType, Field, InputType, Int} from "type-graphql";
import {ArrayMaxSize, Length, Max, MaxLength, Min} from "class-validator";

@InputType()
export class NewWidgetInput {
    @Field()
    @MaxLength(200)
    name: string;

    @Field()
    userId: number;
}
