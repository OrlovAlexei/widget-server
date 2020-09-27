import { Service } from 'typedi';
import { getRepository } from 'typeorm';

import { ListNavigation } from '../abstract/inputs';
import { AbstractService } from '../abstract/service';

import { Widget } from './entity';

@Service()
export class WidgetService extends AbstractService<Widget> {
  protected readonly repository = getRepository(Widget);

  async findByUserId(userId: number, paging: ListNavigation): Promise<Widget[]> {
    return await this.find({ where: { userId }, ...paging });
  }
}
