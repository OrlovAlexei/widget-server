import { Inject, Service } from 'typedi';
import { DeepPartial, getRepository } from 'typeorm';

import { AbstractService } from '../abstract/service';
import { WidgetService } from '../widget/service';

import { Step } from './entity';

@Service()
export class StepService extends AbstractService<Step> {
  protected repository = getRepository(Step);

  @Inject()
  protected widgetService: WidgetService;


  async save(step: DeepPartial<Step>): Promise<Step> {
    const newStep = this.repository.create(step)
    return await this.repository.save(newStep)
  }

  async getCountSteps(widgetId: number): Promise<number> {
    return await this.repository.count({ where: { widgetId } })
  }
}
