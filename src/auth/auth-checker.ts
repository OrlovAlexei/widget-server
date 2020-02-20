import {AuthChecker} from "type-graphql";
import {IContext} from "../main";
import {Container} from "typedi";
import {JwtService} from "../jwt/service";
import {config} from "../config";
import {UserService} from "../user/service";
import {Roles} from "../rbac/roles";

export const customAuthChecker: AuthChecker<IContext> = async (
    resolverData,
    roles: string[],
) => {
    const token = resolverData.context.req.header('Authorization');

    if (!token) {
        return false;
    }

    const jwtService = Container.get(JwtService);

    const userData = jwtService.verify(token, config.jwt.secret);

    if (userData === false) {
        return false;
    }

    const userService = Container.get(UserService);

    const user = await userService.findById(userData.id);

    if (!user) {
        return false;
    }

    for (const role of user.roles) {
        if (roles.indexOf(role.name) !== -1) {
            return true;
        }
    }

    return false;
};
