import {AuthChecker} from "type-graphql";
import {IContext} from "../main";
import {Container} from "typedi";
import {JwtService} from "../jwt/service";
import isJWT = require("validator/lib/isJWT");
import {config} from "../config";
import {UserService} from "../user/service";
import toInt = require("validator/lib/toInt");

export const customAuthChecker: AuthChecker<IContext> = async (
    resolverData,
    roles,
) => {
    const token = resolverData.context.req.header('token');

    if (!token) {
        return false;
    }

    const jwtService = Container.get(JwtService);

    const userData = jwtService.verify(token, config.jwt.secret);

    if (userData === false) {
        return false;
    }

    const userService = Container.get(UserService);

    const user = await userService.findOne(toInt(userData.id));

    if (!user) {
        return false;
    }

    for (const role of roles) {
        if (user.roles.indexOf(role) !== -1) {
            return true;
        }
    }

    return false;
};
