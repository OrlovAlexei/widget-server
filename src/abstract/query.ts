import {ArgsType, Field, Int} from "type-graphql";
import {Max, Min} from "class-validator";


@ArgsType()
export class GetList {
    @Field(() => Int)
    @Min(0)
    skip: number = 0;

    @Field(() => Int)
    @Min(1)
    @Max(100)
    take: number = 25;
}
