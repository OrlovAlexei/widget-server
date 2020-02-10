import {Arg, Ctx, Mutation, Query, Resolver} from "type-graphql";
import {AuthUserInput, RegUserInput} from "./inputs";
import {User} from "./entity";
import {UserService} from "./service";
import {Inject} from "typedi";
import {JwtService} from "../jwt/service";
import {IContext} from "../main";
import {config} from "../config";

@Resolver(User)
export class UserResolver {
    @Inject()
    private readonly userService: UserService;

    @Inject()
    private readonly jwtService: JwtService;

    @Mutation(() => User)
    async register(@Arg('regUserData') regUserData: RegUserInput, @Ctx() ctx: IContext) {
        const user = await this.userService.create(regUserData);

        ctx.res.header('Authorization', `Bearer ${user.token}`);

        return user;
    }

    @Query(() => User)
    async auth(@Arg('authUser') authUser: AuthUserInput, @Ctx() ctx: IContext) {
        const user = await this.userService.findByEmail(authUser.email);

        user.token = this.jwtService.generate({id: user.id, roles: user.roles}, config.jwt.secret);
        this.userService.save(user);

        if (!user) {
            throw new Error("USER not found");
        }

        if (user.password !== authUser.password) {
            throw new Error("Wrong password");
        }

        ctx.res.header('Authorization', `Bearer ${user.token}`);

        return user;
    }
}
