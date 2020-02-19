import { AbstractEntity } from "abstract/entity";
import { Entity, Column } from "typeorm";
import { Roles } from "rbac/roles";

@Entity()
export class Role extends AbstractEntity {
    @Column({
        type: 'varchar',
        length: 2048,
        transformer: {
            from: (value: string) => {
                for (const enumValue in Roles) {
                    if (Roles[enumValue] === value) {
                        return enumValue;
                    }
                }

                return null;
            },
            to: (value: Roles) => value.toString()
        },
    })
    name: Roles;
}