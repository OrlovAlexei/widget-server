import {Arg, Ctx, Mutation, Query, Resolver} from "type-graphql";
import {AuthUserInput, RegUserInput} from "./inputs";
import {User} from "./entity";
import {UserService} from "./service";
import {Inject} from "typedi";
import {JwtService} from "../jwt/service";
import {IContext} from "../main";
import {config} from "../config";
import { UserPayload, UserNotFoundProblem, UserResultType } from "./payload";

@Resolver(User)
export class UserResolver {
    @Inject()
    private readonly userService: UserService;

    @Inject()
    private readonly jwtService: JwtService;

    @Mutation(() => UserPayload)
    async register(@Arg('regUser') regUser: RegUserInput, @Ctx() ctx: IContext) {
        const user = await this.userService.create(regUser);
        const userPayload = UserPayload.create(user);

        ctx.res.header('Authorization', `Bearer ${user.token}`);

        return userPayload;
    }

    @Query(() => UserResultType)
    async auth(@Arg('authUser') authUser: AuthUserInput, @Ctx() ctx: IContext) {
        let user = await this.userService.findByEmail(authUser.email);

        if (!user) {
            const notFound = new UserNotFoundProblem();
            notFound.email = authUser.email;
            return notFound;
        }

        user.token = this.jwtService.generate({id: user.id, roles: user.roles}, config.jwt.secret);
        user = await this.userService.save(user);

        if (user.password !== authUser.password) {
            throw new Error("Wrong password");
        }

        ctx.res.header('Authorization', `Bearer ${user.token}`);

        return user;
    }
}
