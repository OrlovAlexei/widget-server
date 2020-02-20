import { AbstractEntity } from "../abstract/entity";
import { Entity, Column } from "typeorm";
import { Roles } from "../rbac/roles";
import { ObjectType, Field } from "type-graphql";

@Entity()
@ObjectType()
export class Role extends AbstractEntity {
    constructor(roleName: Roles) {
        super();
        this.name = roleName;
    }

    @Field()
    @Column({
        type: 'varchar',
        length: 2048,
        transformer: {
            from: (value: string) => {
                for (const enumValue in Roles) {
                    if (Roles[enumValue] === value) {
                        return value;
                    }
                }

                return null;
            },
            to: (value: Roles) => value.toString()
        },
    })
    name: Roles;
}