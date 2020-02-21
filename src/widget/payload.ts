import {Field, ID, ObjectType} from "type-graphql";
import { Widget } from './entity';
import { StepPayload } from "../step/payload";
import { AbstractPayload } from "../abstract/payload";

@ObjectType()
export class WidgetPayload extends AbstractPayload {
    constructor(widget: Widget) {
        super(widget);

        this.id = widget.id;
        this.name = widget.name;
        this.userId = widget.userId;

        this.steps = widget.steps?.map(step => new StepPayload(step, false))  || [];
    }

    @Field()
    name: string;

    @Field(() => ID)
    userId: number;

    @Field(() => [StepPayload])
    steps: StepPayload[] = [];
}
