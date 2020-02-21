import {Field, ID, ObjectType} from "type-graphql";
import { Widget } from './entity';
import { StepPayload } from "../step/payload";

@ObjectType()
export class WidgetPayload {
    constructor(widget: Widget) {
        this.id = widget.id;
        this.name = widget.name;
        this.userId = widget.userId;


        this.steps = widget.steps ? widget.steps.map(step => new StepPayload(step, false)) : [];
    }

    @Field(() => ID)
    id: number;

    @Field()
    name: string;

    @Field(() => ID)
    userId: number;

    @Field(() => [StepPayload])
    steps: StepPayload[] = [];
}
