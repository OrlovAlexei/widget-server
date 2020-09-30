import { Arg, Authorized, FieldResolver, Query, Resolver, Root } from 'type-graphql';
import { Inject } from 'typedi';

import { Roles } from '../roles/roles';
import { WidgetPayload } from '../widget/payload';
import { WidgetService } from '../widget/service';

import { StepPayload } from './payload';
import { StepService } from './service';

@Resolver(StepPayload)
export class StepResolver {
  @Inject()
  private readonly stepService: StepService;

  @Inject()
  private readonly widgetService: WidgetService;


  @Authorized(Roles.ADMIN, Roles.USER)
  @FieldResolver(() => WidgetPayload)
  async widget(@Root() step: StepPayload): Promise<WidgetPayload> {
    const widget = await this.widgetService.findById(step.widgetId)
    return new WidgetPayload(widget)
  }

  @Authorized(Roles.ADMIN, Roles.USER)
  @Query(() => StepPayload)
  async step(@Arg("id") id: number): Promise<StepPayload> {
    const step = await this.stepService.findById(id)
    return new StepPayload(step)
  }
}
