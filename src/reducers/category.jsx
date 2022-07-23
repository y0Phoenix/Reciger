import {
    CLEAR_CATEGORIES,
    GET_CATEGORIES,
    GET_CATEGORIES_FAIL,
} from '../actions/types';

const initialState = {
    ingredient: [],
    recipe: [],
    error: {}
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
    const {type, payload} = action;

    switch (type) {
        case GET_CATEGORIES:
            state = {...state, ingredient: payload.ingredient, recipe: payload.recipe}; 
            return state;
        case GET_CATEGORIES_FAIL:
        case CLEAR_CATEGORIES:
            state = {...state}
            return state;
        default:
            return state;
    }
}