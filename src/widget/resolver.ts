import {Arg, Args, Ctx, FieldResolver, Query, Resolver, Root, Authorized} from "type-graphql";
import {EntityNotFoundError} from "../exception/repo";
import {Widget} from "./entity";
import {GetList} from "../abstract/inputs";
import {WidgetService} from "./service";
import {Inject} from "typedi";
import {UserService} from "../user/service";
import {IContext} from "../main";
import { UserPayload } from "../user/payload";
import { Roles } from "../rbac/roles";

@Resolver(Widget)
export class WidgetResolver {
    @Inject()
    private readonly widgetService: WidgetService;

    @Inject()
    private readonly userService: UserService;

    @FieldResolver(() => UserPayload)
    async owner(@Root() widget: Widget) {
        const user = await this.userService.findById(widget.userId);
        return UserPayload.create(user);
    }

    @Query(() => Widget)
    async widget(@Arg('id') id: string) {
        const widget = await this.widgetService.findOne(id);

        if (widget === undefined) {
            throw new EntityNotFoundError(id);
        }

        return widget;
    }

    @Authorized(Roles.ADMIN, Roles.USER)
    @Query(() => [Widget])
    async widgets(@Args() input: GetList, @Ctx() ctx: IContext) {
        return await this.widgetService.findAll(ctx.currentUser.id, input);
    }
}
