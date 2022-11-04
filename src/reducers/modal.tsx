import { REMOVE_MODAL, RESET_MODAL, SET_CONFIRM_MODAL, SET_INGREDIENT_MODAL } from "../actions/types";
import { ModalAction, ModalState } from "../types/Modal";

const initialState: ModalState = {
    ingredient: {
        id: '',
    },
    confirm: {
        title: '',
        body: '',
        callbacks: [],
        props: [],
        show: false
    }
}

export default function(state = initialState, action: ModalAction) {
    const { type } = action;
    switch (type) {
        case SET_INGREDIENT_MODAL:
            state = {...state, ingredient: action.payload}; 
            return state;
        case SET_CONFIRM_MODAL:
            state = {...state, confirm: action.payload}; 
            return state;
        case REMOVE_MODAL:
            state = {...state, [action.payload]: initialState[action.payload as keyof typeof initialState]};
            return state;
        case RESET_MODAL:
            state = initialState;
            return state;
        default:
            return state;
    }
}
