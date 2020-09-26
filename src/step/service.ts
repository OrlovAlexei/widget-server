import { Inject,Service } from 'typedi';
import { getRepository } from 'typeorm';

import { AbstractService } from '../abstract/service';
import { WidgetService } from '../widget/service';

import { Step } from './entity';
import { StepPayload } from './payload';

@Service()
export class StepService extends AbstractService<Step> {
  protected repository = getRepository(Step);

  @Inject()
  protected widgetService: WidgetService;

  public async createPayloads(widgetId: number): Promise<StepPayload[]> {
    const widget = await this.widgetService.findById(widgetId, ['steps']);

    const stepsPayloads = [];

    for (const step of widget.steps) {
      const stepPayload = new StepPayload(step);

      stepsPayloads.push(stepPayload);
    }

    return stepsPayloads;
  }
}
