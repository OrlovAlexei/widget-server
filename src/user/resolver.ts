import { Arg, Ctx, Mutation, Query, Resolver, FieldResolver, Root } from "type-graphql";
import { AuthUserInput, RegUserInput } from "./inputs";
import { User } from "./entity";
import { UserService } from "./service";
import { Inject } from "typedi";
import { JwtService } from "../jwt/service";
import { IContext } from "../main";
import { config } from "../config";
import { UserPayload, UserNotFoundProblem, UserResultType, WrongPasswordProblem } from "./payload";

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

        if (user.password !== authUser.password) {
            const wrongPassword = new WrongPasswordProblem();
            return wrongPassword;
        }

        user.token = this.jwtService.generate({ id: user.id, roles: user.roles }, config.jwt.secret);
        user = await this.userService.save(user);

        console.log(this.jwtService.verify(user.token, config.jwt.secret));

        ctx.res.header('Authorization', `Bearer ${user.token}`);

        return UserPayload.create(user);
    }
}
