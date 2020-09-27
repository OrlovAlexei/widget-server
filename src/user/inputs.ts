import { IsEmail } from 'class-validator';
import { Field, InputType } from 'type-graphql';

import { Roles } from '../roles/roles';

@InputType()
export class NewUserInput {
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

  @Field(() => Roles)
  roles: Roles;
}

@InputType()
export class LoginUserInput {
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
