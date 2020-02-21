import { Arg, Ctx, Mutation, Query, Resolver, Authorized, Args, FieldResolver, Root } from "type-graphql";
import { AuthUserInput, RegUserInput } from "./inputs";
import { UserService } from "./service";
import { Inject } from "typedi";
import { JwtService } from "../jwt/service";
import { IContext } from "../main";
import { config } from "../config";
import { UserPayload, UserNotFoundProblem, UserResultType, WrongPasswordProblem } from "./payload";
import { WidgetPayload } from "../widget/payload";
import { WidgetService } from "../widget/service";
import { Roles } from "../rbac/roles";
import { GetList } from "../abstract/inputs";

@Resolver(UserPayload)
export class UserResolver {
    @Inject()
    private readonly widgetService: WidgetService;
    
    @Inject()
    private readonly userService: UserService;

    @Inject()
    private readonly jwtService: JwtService;

    @Query(() => UserResultType)
    async user(@Arg('id') id: number) {
        const user = await this.userService.findById(id);

        if (!user) {
            return new UserNotFoundProblem();
        }

        return new UserPayload(user);
    }

    @Mutation(() => UserPayload)
    async register(@Arg('regUser') regUser: RegUserInput, @Ctx() ctx: IContext) {
        const user = await this.userService.create(regUser);
        const userPayload = new UserPayload(user);

        ctx.res.header('Authorization', `Bearer ${user.token}`);

        return userPayload;
    }

    @Mutation(() => UserResultType)
    async auth(@Arg('authUser') authUser: AuthUserInput, @Ctx() ctx: IContext) {
        let user = await this.userService.findByEmail(authUser.email);

        if (!user) {
            return new UserNotFoundProblem();
        }

        if (user.password !== authUser.password) {
            const wrongPassword = new WrongPasswordProblem();
            return wrongPassword;
        }

        user.token = this.jwtService.generate({ id: user.id, roles: user.roles }, config.jwt.secret);
        user = await this.userService.save(user);

        ctx.res.header('Authorization', `Bearer ${user.token}`);

        return new UserPayload(user);
    }

    @FieldResolver(() => [WidgetPayload])
    async widgets(@Args() input: GetList, @Root() userPayload: UserPayload) {
        const widgets = await this.widgetService.findByUserId(userPayload.id, input);

        return widgets.map(widget => new WidgetPayload(widget));
    }
}
