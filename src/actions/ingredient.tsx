import { 
    GET_INGREDIENT,
    GET_INGREDIENTS,
    GET_INGREDIENTS_FAIL,
    SetShowModal
} from "./types";
import axios from "axios";
import {setAlert} from "./alert";
import { loading, stopLoading } from "./loading";
import ShowModal from "../types/ShowModal";
import React from "react";
import { ThunkDispatch } from "redux-thunk";
import State from "../types/State";
import { IngredientAction } from "../types/Ingredient";

export const getIngredients = (all = false, id: string | null, setShowModal: SetShowModal, showModal: ShowModal, state = false)  => async (dispatch: ThunkDispatch<State, undefined, IngredientAction>) => {
    try {
        var res;
        const token = localStorage.token;
        dispatch(loading());
        if (id) {
            res = await axios.get(`/api/ingredient/${id}`, {
                headers: {
                    "x-auth-token": token
                }
            });
        }
        else {
            res = await axios.get(`/api/ingredient?all=${all}&recipe=false&name=none`, {
                headers: {
                    "x-auth-token": token
                }
            });
        }
        dispatch(stopLoading());
        if (state) {
            if (id) {
                dispatch({
                    type: GET_INGREDIENT,
                    payload: {arr: res.data.data}
                });
            }
            else {
                dispatch({
                    type: GET_INGREDIENTS,
                    payload: id ? [res.data.data] : res.data.data
                });
            }
        }
        return res.data.data;
    } catch (err: any) {
        const msgs = err.response.data.msgs;
        dispatch(stopLoading());
        if (msgs) {
            msgs.forEach((msg: any) => dispatch(setAlert(msg.msg, 'error', setShowModal, showModal)));
        } 
        else {
            dispatch(setAlert('Server Error Try Again Later', 'error', setShowModal, showModal));
        }
        dispatch({
            type: GET_INGREDIENTS_FAIL,
            payload: {}
        });
        return null;
    }
};

interface PostIngredientFormData {
    name: string,
    categories: string[],
    price: string,
    units: {
        volume: string,
        weight: string,
        prefered: string
    }
}

export const postIngredient = (formData: PostIngredientFormData, noNut = false, setShowModal: SetShowModal, showModal: ShowModal, state: boolean, all = false) => async (dispatch: ThunkDispatch<State, undefined, IngredientAction>) => {
    try {
        dispatch(loading());
        const res = await axios.post(`/api/ingredient?noNut=${noNut}&all=${all}`, formData);
        dispatch(stopLoading());
        if (state) {
            dispatch({
                type: GET_INGREDIENTS,
                payload: res.data.data
            });
            const msgs = res.data.msgs;
            if (msgs) {
                msgs.forEach((msg: any) => dispatch(setAlert(msg.msg, 'success', setShowModal, showModal)));
            }
        }
        return res.data.data;
    } catch (err: any) {
        dispatch(stopLoading());
        const msgs = err.response.data.msgs;
        if (msgs) {
            msgs.forEach((msg: any) => dispatch(setAlert(msg.msg, 'error', setShowModal, showModal)));
        }
        else {
            dispatch(setAlert('Server Error Try Again Later', 'error', setShowModal, showModal));
        } 
        dispatch({
            type: GET_INGREDIENTS_FAIL,
            payload: {}
        });
        return null
    }
}

export const updateIngredient = (formData: PostIngredientFormData, id: string, all: boolean, noNut: boolean, setShowModal: SetShowModal, showModal: ShowModal) => async (dispatch: ThunkDispatch<State, undefined, IngredientAction>) => {
    try {
        dispatch(loading());
        const res = await axios.post(`/api/ingredient/update/${id}?all=${all}&noNut=${noNut}`, formData);
        dispatch(stopLoading());
        dispatch({
            type: GET_INGREDIENTS,
            payload: res.data.data
        });
        const msgs = res.data.msgs;
        if (msgs) {
            msgs.forEach((msg: any) => dispatch(setAlert(msg.msg, 'success', setShowModal, showModal)));
        }
    } catch (err: any) {
        dispatch(stopLoading());
        const msgs = err.response.data.msgs;
        if (msgs) {
            msgs.forEach((msg: any) => dispatch(setAlert(msg.msg, 'error', setShowModal, showModal)));
        }
        else {
            dispatch(setAlert('Server Error Try Again Later', 'error', setShowModal, showModal));
        }
        dispatch({
            type: GET_INGREDIENTS_FAIL,
            payload: {}
        });
    }
};

interface DeleteIngredientProps {
    id: string,
    setShowModal: SetShowModal,
    showModal: ShowModal
};

export const deleteIngredient = ({id, setShowModal, showModal}: DeleteIngredientProps) => async (dispatch: ThunkDispatch<State, undefined, IngredientAction>) => {
    try {
        dispatch(loading());
        const res = await axios.delete(`/api/ingredient/${id}`);
        dispatch(stopLoading());

        dispatch({
            type: GET_INGREDIENTS,
            payload: res.data.data
        });
        const msgs = res.data.msgs;
        if (msgs) {
            msgs.forEach((msg: any) => dispatch(setAlert(msg.msg, 'success', setShowModal, showModal)));
        }
    } catch (err: any) {
        dispatch(stopLoading());
        const msgs = err.response.data.msgs;
        if (msgs) {
            msgs.forEach((msg: any) => dispatch(setAlert(msg.msg, 'error', setShowModal, showModal)));
        }
        else {
            dispatch(setAlert('Server Error Try Again Later', 'error', setShowModal, showModal));
        }
        dispatch({
            type: GET_INGREDIENTS_FAIL,
            payload: {}
        });
    }
};