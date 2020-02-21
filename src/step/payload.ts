import { ObjectType, Field, ID } from 'type-graphql';
import { WidgetPayload } from '../widget/payload';
import { Step } from './entity';
import { AbstractPayload } from '../abstract/payload';

@ObjectType()
export class StepPayload extends AbstractPayload {
    constructor(step: Step, withWidget: boolean = true) {
        super(step);

        this.widgetId = step.widgetId;
        this.name = step.name;
        this.text = step.text;

        if (withWidget) {
            this.widget = new WidgetPayload(step.widget);
        }
    }

    @Field(() => ID)
    widgetId: number;

    @Field()
    name: string;

    @Field()
    text: string;

    @Field(() => [WidgetPayload])
    widget: WidgetPayload;
}
