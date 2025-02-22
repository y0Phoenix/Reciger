import { 
    CLEAR_INGREDIENTS,
    GET_INGREDIENTS,
    GET_INGREDIENT,
    GET_INGREDIENTS_FAIL,
    FILTER_INGREDIENTS,
    RESET_FILTER_INGREDIENTS
} from "../actions/types";
import { IngredientAction, IngredientState } from "../types/Ingredient";

const initialState: IngredientState = {
    ingredients: [],
    filter: [],
    filtered: false,
    error: {},
    loading: false,   
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function(state = initialState, action: IngredientAction) {
    const {type} = action;

    switch (type) {
        case GET_INGREDIENTS:
            state = {...state, ingredients: action.payload}
            return state;
        case GET_INGREDIENT:
            const i = state.ingredients.map(ing => ing._id).indexOf(action.payload._id);
            if (i > -1) state.ingredients[i] = action.payload;
            else state.ingredients.push(action.payload);
            return state;
        case FILTER_INGREDIENTS:
            state = {...state, filter: action.payload, filtered: true};
            return state
        case RESET_FILTER_INGREDIENTS:
            state = {...state, filter: [], filtered: false};
            return state
        case GET_INGREDIENTS_FAIL:
        case CLEAR_INGREDIENTS:
            state = initialState;
            return state;
        default:
            return state;
    }
}