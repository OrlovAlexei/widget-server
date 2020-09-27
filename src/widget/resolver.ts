import { Arg, Args, Authorized, Ctx, FieldResolver, Int, Mutation, Query, Resolver, Root } from 'type-graphql';
import { Inject } from 'typedi';

import { ListNavigation } from '../abstract/inputs';
import { IContext } from '../main';
import { Roles } from '../roles/roles';
import { Step } from '../step/entity';
import { StepPayload } from '../step/payload';
import { StepService } from '../step/service';
import { UserPayload } from '../user/payload';
import { UserService } from '../user/service';

import { NewWidgetInput } from './inputs';
import { QueryWidgetType, WidgetNotFoundProblem, WidgetPayload } from './payload';
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

  @FieldResolver(() => Int)
  async stepsCount(@Root() widget: WidgetPayload): Promise<number> {
    return this.stepService.getCountSteps(widget.id)
  }

  @FieldResolver(() => [StepPayload])
  async steps(@Args() navigation: ListNavigation, @Root() widget: WidgetPayload): Promise<StepPayload[]> {
    return await this.stepService.find({ where: { widgetId: widget.id }, ...navigation })
  }

  @Query(() => QueryWidgetType)
  async widget(@Arg('id') id: number): Promise<WidgetPayload | WidgetNotFoundProblem> {
    const widget = await this.widgetService.findById(id);

    if (!widget) {
      throw new WidgetNotFoundProblem();
    }

    return new WidgetPayload(widget);
  }

  @Authorized(Roles.ADMIN, Roles.USER)
  @Query(() => [WidgetPayload])
  async widgets(@Args() input: ListNavigation, @Ctx() ctx: IContext): Promise<WidgetPayload[]> {
    const widgets = await this.widgetService.findByUserId(ctx.currentUser.id, input);

    return widgets.map((widget) => new WidgetPayload(widget));
  }

  @Authorized(Roles.ADMIN, Roles.USER)
  @Mutation(() => WidgetPayload)
  async newWidget(@Arg("input") input: NewWidgetInput, @Ctx() ctx: IContext): Promise<WidgetPayload> {
    const newWidget = await this.widgetService.create({ ...input, userId: ctx.currentUser.id })

    let steps: Step[] = []

    if (input.hasStep) {
      steps = await Promise.all(input.steps.map(async (st, index) => await this.stepService.save({ ...st, index, widgetId: newWidget.id })))
    }

    return new WidgetPayload({ ...newWidget, steps })
  }

}
