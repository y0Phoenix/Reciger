import { 
    CLEAR_INGREDIENTS,
    GET_INGREDIENTS,
    GET_INGREDIENTS_FAIL
} from "../actions/types";

const initialState = {
    ingredients: [],
    error: {},
    loading: false,   
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function(state = initialState, action) {
    const {type, payload} = action;

    switch (type) {
        case GET_INGREDIENTS:
            state = {...state, ingredients: payload}
            return state;
        case GET_INGREDIENTS_FAIL:
        case CLEAR_INGREDIENTS:
            state = {...state, ingredients: [], error: payload}
            return state;
        default:
            return state;
    }
}