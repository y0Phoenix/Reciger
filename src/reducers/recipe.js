import { 
    GET_RECIPES,
    GET_RECIPES_FAIL 
} from "../actions/types";

const initialState = {
    recipes: [],
    error: {},
    loading: true
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function(state = initialState, action) {
    const {type, payload} = action;

    switch (type) {
        case GET_RECIPES:
            state = {...state, recipes: payload, loading: false}
            return state;
        case GET_RECIPES_FAIL:
            state = {...state, recipes: [], error: payload, loading: false}
            return state;
        default:
            return state;
    }
}