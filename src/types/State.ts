import { Alert } from "./Alert";
import { IngredientState } from "./Ingredient";
import { ModalState } from "./Modal";
import { RecipeState } from "./Recipe";
import { ToastState } from "./Toast";
import { UserState } from "./User";

export default interface State {
    alert: Alert[],
    user: UserState,
    ingredient: IngredientState,
    recipe: RecipeState,
    loading: {
        bool: boolean
    };
    modal: ModalState,
    toast: ToastState,
};