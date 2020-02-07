import {Arg, Args, Authorized, Ctx, Mutation, Query, Resolver} from "type-graphql";
import {Recipe} from "./entity";
import {RecipeService} from "./service";
import {NewRecipeInput, RecipesArgs} from "./inputs";
import {User} from "../user/entity";
import {EntityNotFoundError} from "../exception/repo";

@Resolver(Recipe)
export class RecipeResolver {
    constructor(private recipeService: RecipeService) {}

    @Query(() => Recipe)
    async recipe(@Arg("id") id: string) {
        const recipe = await this.recipeService.findById(id);
        if (recipe === undefined) {
            throw new EntityNotFoundError(id);
        }
        return recipe;
    }

    @Query(() => [Recipe])
    recipes(@Args() { skip, take }: RecipesArgs) {
        return this.recipeService.findAll({ skip, take });
    }

    @Mutation(() => Recipe)
    addRecipe(
        @Arg("newRecipeData") newRecipeData: NewRecipeInput,
        @Ctx("user") user: User,
    ): Promise<Recipe> {
        return this.recipeService.addNew({ data: newRecipeData, user });
    }

    @Mutation(() => Boolean)
    async removeRecipe(@Arg("id") id: string) {
        try {
            await this.recipeService.removeById(id);
            return true;
        } catch {
            return false;
        }
    }
}
