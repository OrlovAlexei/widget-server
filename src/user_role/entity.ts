import { AbstractEntity } from "../abstract/entity";
import { Role } from "../role/entity";
import { Column, Entity } from "typeorm";
import { ObjectType, Field } from "type-graphql";

@Entity()
@ObjectType()
export class UserRole extends AbstractEntity {
    constructor(userId: number, roleId: number) {
        super();
        this.userId = userId;
        this.roleId = roleId;
    }

    @Field()
    @Column()
    private userId: number;

    @Field()
    @Column()
    private roleId: number;

    private role: Role;

    public getRole(): Role {
        return this.role;
    }

    public setRole(value: Role) {
        this.role = value;
    }

    public getRoleId(): number {
        return this.roleId;
    }

    public setRoleId(value: number) {
        this.roleId = value;
    }

    public getUserId(): number {
        return this.userId;
    }

    public setUserId(value: number) {
        this.userId = value;
    }
}