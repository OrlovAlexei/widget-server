import { Arg, Args, Ctx, FieldResolver, Query, Resolver, Root, Authorized } from 'type-graphql';
import { EntityNotFoundError } from '../exception/repo';
import { GetList } from '../abstract/inputs';
import { WidgetService } from './service';
import { Inject } from 'typedi';
import { UserService } from '../user/service';
import { IContext } from '../main';
import { UserPayload } from '../user/payload';
import { Roles } from '../rbac/roles';
import { WidgetPayload } from './payload';
import { StepPayload } from '../step/payload';
import { StepService } from '../step/service';

@Resolver(WidgetPayload)
export class WidgetResolver {
  @Inject()
  private readonly stepService: StepService;

  @Inject()
  private readonly widgetService: WidgetService;

  @Inject()
  private readonly userService: UserService;

  @FieldResolver(() => UserPayload)
  async user(@Root() widget: WidgetPayload) {
    const user = await this.userService.findById(widget.userId);
    return new UserPayload(user);
  }

  @Query(() => WidgetPayload)
  async widget(@Arg('id') id: string) {
    const widget = await this.widgetService.findById(id);

    if (widget === undefined) {
      throw new EntityNotFoundError(id);
    }

    return new WidgetPayload(widget);
  }

  @Authorized(Roles.ADMIN, Roles.USER)
  @Query(() => [WidgetPayload])
  async widgets(@Args() input: GetList, @Ctx() ctx: IContext) {
    const widgets = await this.widgetService.findByUserId(ctx.currentUser.id, input);

    return widgets.map((widget) => new WidgetPayload(widget));
  }

  @FieldResolver(() => [StepPayload])
  async steps(@Root() widgetPayload: WidgetPayload) {
    return this.stepService.createPayloads(widgetPayload.id);
  }
}
