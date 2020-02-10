import {Arg, Args, Ctx, FieldResolver, Query, Resolver, Root} from "type-graphql";
import {EntityNotFoundError} from "../exception/repo";
import {Widget} from "./entity";
import {GetList} from "../abstract/inputs";
import {WidgetService} from "./service";
import {Inject} from "typedi";
import {UserService} from "../user/service";
import {User, UserResultType} from "../user/entity";
import {IContext} from "../main";

@Resolver(Widget)
export class WidgetResolver {
    @Inject()
    private readonly widgetService: WidgetService;

    @Inject()
    private readonly userService: UserService;

    @FieldResolver(() => User)
    async owner(@Root() widget: Widget) {
        return this.userService.findOne(widget.userId);
    }

    @Query(() => Widget)
    async widget(@Arg('id') id: string) {
        const widget = await this.widgetService.findOne(id);

        if (widget === undefined) {
            throw new EntityNotFoundError(id);
        }

        return widget;
    }

    @Query(() => [Widget])
    async widgets(@Args() input: GetList, @Ctx() ctx: IContext) {
        return await this.widgetService.findAll(ctx.currentUser.id, input);
    }
}
