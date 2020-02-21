import {Field, InputType} from "type-graphql";
import { IsEmail } from "class-validator";

@InputType()
export class RegUserInput {
    @Field()
    @IsEmail({}, {
        message: "Invalid email format"
    })
    email: string;

    @Field()
    password: string;
}

@InputType()
export class AuthUserInput {
    @Field()
    @IsEmail({}, {
        message: "Invalid email format"
    })
    email: string;

    @Field()
    password: string;
}
