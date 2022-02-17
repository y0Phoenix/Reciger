import { 
    CLEAR_RECIPES,
    GET_RECIPES,
    GET_RECIPES_FAIL
} from "../actions/types";

const initialState = {
    recipes: [],
    error: {},
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function(state = initialState, action) {
    const {type, payload} = action;

    switch (type) {
        case GET_RECIPES:
        state = {...state, recipes: payload}
        return state;
        case GET_RECIPES_FAIL:
        case CLEAR_RECIPES:
            state = {...state, recipes: [], error: payload}
            return state;
        default:
            return state;
    }
}