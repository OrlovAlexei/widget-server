import { AbstractEntity } from "abstract/entity";
import { Role } from "role/entity";
import { Column } from "typeorm";

export class UserRole extends AbstractEntity {
    @Column()
    userId: number;

    @Column()
    roleId: number;

    role: Role
}