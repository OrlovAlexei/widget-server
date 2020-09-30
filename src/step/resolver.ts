import { Arg, Query, Resolver } from 'type-graphql';
import { Inject } from 'typedi';

import { StepPayload } from './payload';
import { StepService } from './service';

@Resolver(StepPayload)
export class StepResolver {
  @Inject()
  private readonly stepService: StepService;


  @Query(() => StepPayload)
  async step(@Arg("id") id: number): Promise<StepPayload> {
    const step = await this.stepService.findById(id)
    return new StepPayload(step)
  }
}
