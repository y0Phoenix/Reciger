  import { REMOVE_MODAL, RESET_MODAL, SET_CONFIRM_MODAL, SET_INGREDIENT_MODAL } from "../actions/types"

export interface ModalState {
    ingredient: IngredientModal,
    confirm: ConfirmModal
};

export interface SetConfirmModalAction {
    type: typeof SET_CONFIRM_MODAL,
    payload: ConfirmModal
};
export interface SetIngredientModalAction {
    type: typeof SET_INGREDIENT_MODAL,
    payload: IngredientModal
};
export interface RemoveModalAction {
    type: typeof REMOVE_MODAL,
    payload: ModalTypes 
};
export interface ResetModalAction {
    type: typeof RESET_MODAL,
};

export type ModalTypes = 'ingredient' | 'confirm';

export type ModalAction = SetConfirmModalAction | SetIngredientModalAction | RemoveModalAction | ResetModalAction;

// needs the type property to distinguish which modal is being passed
export interface IngredientModal {
    id: string,
};

export interface ConfirmModal {
    title: string,
    body: string,
    callbacks: any[],
    show: boolean,
    /**
     * @description props must be an array/arrays inside of an array. the array/arrays must be inorder by index from which the callbacks are in
     */
    props: any[][],
};