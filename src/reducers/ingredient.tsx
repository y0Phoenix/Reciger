import { 
    CLEAR_INGREDIENTS,
    GET_INGREDIENTS,
    GET_INGREDIENT,
    GET_INGREDIENTS_FAIL
} from "../actions/types";
import { IngredientAction, IngredientState } from "../types/Ingredient";

const initialState: IngredientState = {
    ingredients: [],
    error: {},
    loading: false,   
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function(state = initialState, action: IngredientAction) {
    const {type, payload} = action;

    switch (type) {
        case GET_INGREDIENTS:
            state = {...state, ingredients: payload.arr ? payload.arr : []}
            return state;
        case GET_INGREDIENT:
            if (!payload?.obj) return state;
            const i = state.ingredients.map(ing => ing._id).indexOf(payload.obj._id);
            if (i > -1) state.ingredients[i] = payload.obj;
            else state.ingredients.push(payload.obj);
            return state;
        case GET_INGREDIENTS_FAIL:
        case CLEAR_INGREDIENTS:
            state = {...state, ingredients: [], error: payload}
            return state;
        default:
            return state;
    }
}