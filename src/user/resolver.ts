import { Arg, Args, Ctx, FieldResolver, Mutation, Query, Resolver, Root } from 'type-graphql';
import { Inject } from 'typedi';
import { GetList } from '../abstract/inputs';
import { config } from '../config';
import { JwtService } from '../jwt/service';
import { IContext } from '../main';
import { WidgetPayload } from '../widget/payload';
import { WidgetService } from '../widget/service';
import { AuthUserInput, RegUserInput } from './inputs';
import {
  EmailBusyProblem,
  QueryUserType,
  UserLoginType,
  UserNotFoundProblem,
  UserPayload,
  WrongPasswordProblem,
} from './payload';
import { UserService } from './service';

@Resolver(UserPayload)
export class UserResolver {
  @Inject()
  private readonly widgetService: WidgetService;

  @Inject()
  private readonly userService: UserService;

  @Inject()
  private readonly jwtService: JwtService;

  @Query(() => QueryUserType)
  async user(@Arg('id') id: number) {
    const user = await this.userService.findById(id);

    if (!user) {
      return new UserNotFoundProblem();
    }

    return new UserPayload(user);
  }

  @Mutation(() => QueryUserType)
  async register(@Arg('regUser') regUser: RegUserInput, @Ctx() ctx: IContext) {
    const sameEmailUser = await this.userService.findByEmail(regUser.email);

    if (sameEmailUser !== undefined) {
      return new EmailBusyProblem();
    }

    const user = await this.userService.create(regUser);

    const userPayload = new UserPayload(user);

    ctx.res.header('Authorization', `Bearer ${user.token}`);

    return userPayload;
  }

  @Mutation(() => UserLoginType)
  async auth(@Arg('authUser') authUser: AuthUserInput, @Ctx() ctx: IContext) {
    let user = await this.userService.findByEmail(authUser.email);

    if (!user) {
      return new UserNotFoundProblem();
    }

    if (user.password !== authUser.password) {
      const wrongPassword = new WrongPasswordProblem();
      return wrongPassword;
    }

    user.token = this.jwtService.generate({ id: user.id, roles: user.roles }, config.jwt.secret);
    user = await this.userService.save(user);

    ctx.res.header('Authorization', `Bearer ${user.token}`);

    return new UserPayload(user);
  }

  @FieldResolver(() => [WidgetPayload])
  async widgets(@Args() input: GetList, @Root() userPayload: UserPayload) {
    const widgets = await this.widgetService.findByUserId(userPayload.id, input);

    return widgets.map((widget) => new WidgetPayload(widget));
  }
}
