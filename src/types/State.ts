import { Alert } from "./Alert";
import { IngredientState } from "./Ingredient";
import { RecipeState } from "./Recipe";
import { UserState } from "./User";

export default interface State {
    alert: Alert[],
    user: UserState,
    ingredient: IngredientState,
    recipe: RecipeState,
    loading: {
        bool: boolean
    }
};