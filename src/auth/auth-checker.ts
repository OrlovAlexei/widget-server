import {AuthChecker} from "type-graphql";
import {IContext} from "../main";
import {Container} from "typedi";
import {JwtService} from "../jwt/service";
import {config} from "../config";
import {UserService} from "../user/service";

export const customAuthChecker: AuthChecker<IContext> = async (
    resolverData,
    roles: string[],
) => {
    const user = resolverData.context.currentUser;

    if (!user || user.id === 0) {
        return false;
    }

    for (const role of user.roles) {
        if (roles.indexOf(role.name) !== -1) {
            return true;
        }
    }

    return false;
};
