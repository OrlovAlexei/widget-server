import { AbstractService } from "../abstract/service";
import { Service, Inject } from "typedi";
import { Step } from "./entity";
import { getRepository } from "typeorm";
import { StepPayload } from "./payload";
import { WidgetService } from "../widget/service";

@Service()
export class StepService extends AbstractService<Step> {
    protected repository = getRepository(Step);

    @Inject()
    protected widgetService: WidgetService;

    public async createPayloads(widgetId: number) : Promise<StepPayload[]> {
        const widget = await this.widgetService.findById(widgetId, ["steps"]);

        const stepsPayloads = [];

        for (const step of widget.steps) {
            const stepPayload = new StepPayload(step);

            stepsPayloads.push(stepPayload);
        }

        return stepsPayloads;
    }
}