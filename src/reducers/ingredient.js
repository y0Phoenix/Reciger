import { 
    GET_INGREDIENTS,
    GET_INGREDIENTS_FAIL,
} from "../actions/types";

const initialState = {
    ingredients: [],
    error: {},
    loading: true,   
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function(state = initialState, action) {
    const {type, payload} = action;

    switch (type) {
        case GET_INGREDIENTS:
            state = {...state, ingredients: payload, loading: false}
            return state;
        case GET_INGREDIENTS_FAIL:
            state = {...state, ingredients: [], loading: false, error: payload}
            return state;
        default:
            return state;
    }
}