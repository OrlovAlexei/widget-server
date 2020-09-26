import { Arg, Args, Authorized, Ctx, FieldResolver, Query, Resolver, Root } from 'type-graphql';
import { Inject } from 'typedi';

import { GetList } from '../abstract/inputs';
import { EntityNotFoundError } from '../exception/repo';
import { IContext } from '../main';
import { Roles } from '../roles/roles';
import { StepService } from '../step/service';
import { UserPayload } from '../user/payload';
import { UserService } from '../user/service';

import { WidgetPayload } from './payload';
import { WidgetService } from './service';

@Resolver(WidgetPayload)
export class WidgetResolver {
  @Inject()
  private readonly stepService: StepService;

  @Inject()
  private readonly widgetService: WidgetService;

  @Inject()
  private readonly userService: UserService;

  @FieldResolver(() => UserPayload)
  async user(@Root() widget: WidgetPayload): Promise<UserPayload> {
    const user = await this.userService.findById(widget.userId);
    return new UserPayload(user);
  }

  @Query(() => WidgetPayload)
  async widget(@Arg('id') id: string): Promise<WidgetPayload | EntityNotFoundError> {
    const widget = await this.widgetService.findById(id);

    if (widget) {
      throw new EntityNotFoundError(id);
    }

    return new WidgetPayload(widget);
  }

  @Authorized(Roles.ADMIN, Roles.USER)
  @Query(() => [WidgetPayload])
  async widgets(@Args() input: GetList, @Ctx() ctx: IContext): Promise<WidgetPayload[]> {
    const widgets = await this.widgetService.findByUserId(ctx.currentUser.id, input);

    return widgets.map((widget) => new WidgetPayload(widget));
  }


}
