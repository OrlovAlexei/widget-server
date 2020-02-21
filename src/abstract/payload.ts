import { AbstractEntity } from "./entity";
import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
export abstract class AbstractPayload {
    @Field(() => ID)
    id: number;

    constructor(entity: AbstractEntity) {
        this.id = entity.id;
    }
}