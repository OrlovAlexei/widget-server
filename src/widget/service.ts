import { Service } from 'typedi';
import { getRepository } from 'typeorm';

import { GetList } from '../abstract/inputs';
import { AbstractService } from '../abstract/service';

import { Widget } from './entity';

@Service()
export class WidgetService extends AbstractService<Widget> {
  protected readonly repository = getRepository(Widget);

  findByUserId(userId: number, paging: GetList): Promise<Widget[]> {
    return this.fetch({ where: { userId }, skip: paging.skip, take: paging.take });
  }
}
