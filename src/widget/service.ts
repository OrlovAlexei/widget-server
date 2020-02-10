import {Widget} from "./entity";
import {getRepository} from "typeorm";
import {Service} from "typedi";
import {GetList} from "../abstract/inputs";

@Service()
export class WidgetService {
    private readonly widgetRepository = getRepository(Widget);

    findOne(id: string) : Promise<Widget> {
        return this.widgetRepository.findOne(id);
    }

    findAll(userId: number, paging: GetList) : Promise<Widget[]> {
        return this.widgetRepository.find({skip: paging.skip, take: paging.take});
    }
}
