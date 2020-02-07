import {Field, InputType} from "type-graphql";

@InputType()
export class RegUserInput {
    @Field()
    email: string;

    @Field()
    password: string;
}

@InputType()
export class AuthUserInput {
    @Field()
    email: string;

    @Field()
    password: string;
}
