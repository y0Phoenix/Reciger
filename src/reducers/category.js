import {
    CLEAR_CATEGORIES,
    GET_CATEGORIES,
    GET_CATEGORIES_FAIL,
} from '../actions/types';

const initialState = {
    ingredient: [],
    recipe: [],
    error: {},
    loading: true
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
    const {type, payload} = action;

    switch (type) {
        case GET_CATEGORIES:
            state = {...state, ingredient: payload.ingredient, recipe: payload.recipe, loading: false}; 
            return state;
        case GET_CATEGORIES_FAIL:
        case CLEAR_CATEGORIES:
            state = {...state, loading: false}
            return state;
        default:
            return state;
    }
}