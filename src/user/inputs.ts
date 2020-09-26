import { IsEmail } from 'class-validator';
import { Field, InputType } from 'type-graphql';

import { Roles } from '../roles/roles';

@InputType()
export class RegUserInput {
  @Field()
  @IsEmail(
    {},
    {
      message: 'Invalid email format',
    },
  )
  email: string;

  @Field()
  password: string;

  @Field(() => [Roles])
  roles: Roles[];
}

@InputType()
export class AuthUserInput {
  @Field()
  @IsEmail(
    {},
    {
      message: 'Invalid email format',
    },
  )
  email: string;

  @Field()
  password: string;
}
