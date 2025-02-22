import { ThunkDispatch } from "redux-thunk";
import { ConfirmModal, IngredientModal, ModalAction, ModalTypes } from "../types/Modal";
import State from "../types/State";
import { REMOVE_MODAL, RESET_MODAL, SET_CONFIRM_MODAL, SET_INGREDIENT_MODAL } from "./types";

export const setIngredientModal = (modal: IngredientModal) => (dispatch: ThunkDispatch<State, undefined, ModalAction>) => {
    dispatch({
        type: SET_INGREDIENT_MODAL,
        payload: modal
    })
};

export const setConfirmModal = (modal: ConfirmModal) => (dispatch: ThunkDispatch<State, undefined, ModalAction>) => {
    dispatch({
        type: SET_CONFIRM_MODAL,
        payload: modal
    })
};

export const removeModal = (type: ModalTypes) => (dispatch: ThunkDispatch<State, undefined, ModalAction>) => {
    dispatch({
        type: REMOVE_MODAL,
        payload: type
    });
}

export const resetModal = () => (dispatch: ThunkDispatch<State, undefined, ModalAction>) => {
    dispatch({
        type: RESET_MODAL
    });
}