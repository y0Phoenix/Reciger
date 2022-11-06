import { 
    FILTER_INGREDIENTS,
    GET_INGREDIENT,
    GET_INGREDIENTS,
    GET_INGREDIENTS_FAIL,
    RESET_FILTER_INGREDIENTS
} from "./types";
import axios from "axios";
import {setAlert} from "./alert";
import { loading, stopLoading } from "./loading";
import ShowModal from "../types/ShowModal";
import React from "react";
import { ThunkDispatch } from "redux-thunk";
import State from "../types/State";
import { Ingredient, IngredientAction } from "../types/Ingredient";
import { setToast } from "./toast";
import { Toast } from "../types/Toast";
import setToastFromRes from "../functions/setToastFromRes";

export const getIngredients = (all = false)  => async (dispatch: ThunkDispatch<State, undefined, IngredientAction>) => {
    try {
        var res;
        const token = localStorage.token;
        dispatch(loading());
        res = await axios.get(`/api/ingredient?all=${all}&recipe=false&name=none`, {
            headers: {
                "x-auth-token": token
            }
        });
        dispatch(stopLoading());

        if (res.data.toasts) setToastFromRes(res.data.toasts, dispatch);

        dispatch({
            type: GET_INGREDIENTS,
            payload: res.data.data
        });
    } catch (err: any) {
        dispatch(stopLoading());
        dispatch({
            type: GET_INGREDIENTS_FAIL,
            payload: {}
        });
        if (err.response.data?.toasts) setToastFromRes(err.response.data?.toasts, dispatch);
    }
};

export const getIngredientByID = (id: string) => async (dispatch: ThunkDispatch<State, undefined, IngredientAction>) => {
    try {
        dispatch(loading());
        const res = await axios.get(`/api/ingredient/${id}`);
        dispatch(stopLoading());
        
        if (res.data.toasts) setToastFromRes(res.data.toasts, dispatch);

        dispatch({
            type: FILTER_INGREDIENTS,
            payload: [res.data.data]
        });

    } catch (err: any) {
        dispatch(stopLoading());
        dispatch({
            type: GET_INGREDIENTS_FAIL,
            payload: err.response.data
        });
        if (err.response.data?.toasts) setToastFromRes(err.response.data?.toasts, dispatch);
    }
}

export const postIngredient = (ingredient: Ingredient, noNut = false, all = false) => async (dispatch: ThunkDispatch<State, undefined, IngredientAction>) => {
    try {
        dispatch(loading());
        const res = await axios.post(`/api/ingredient?noNut=${noNut}&all=${all}`, ingredient);
        dispatch(stopLoading());
        dispatch({
            type: GET_INGREDIENTS,
            payload: res.data.data
        });
        if (res.data.toasts) setToastFromRes(res.data.toasts, dispatch);
    } catch (err: any) {
        dispatch(stopLoading());
        if (err.response.data?.toasts) setToastFromRes(err.response.data?.toasts, dispatch);
    }
}

export const updateIngredient = (ingredient: Ingredient, id: string, all: boolean, noNut: boolean) => async (dispatch: ThunkDispatch<State, undefined, IngredientAction>) => {
    try {
        dispatch(loading());
        const res = await axios.post(`/api/ingredient/update/${id}?all=${all}&noNut=${noNut}`, ingredient);
        dispatch(stopLoading());
        dispatch({
            type: GET_INGREDIENTS,
            payload: res.data.data
        });
        if (res.data.toasts) setToastFromRes(res.data.toasts, dispatch);
    } catch (err: any) {
        dispatch(stopLoading());
        if (err.response.data?.toasts) setToastFromRes(err.response.data?.toasts, dispatch);
    }
};

export const deleteIngredient = (id: string) => async (dispatch: ThunkDispatch<State, undefined, IngredientAction>) => {
    try {
        dispatch(loading());
        const res = await axios.delete(`/api/ingredient/${id}`);
        dispatch(stopLoading());

        dispatch({
            type: GET_INGREDIENTS,
            payload: res.data.data
        });
        if (res.data.toasts) setToastFromRes(res.data.toasts, dispatch);
    } catch (err: any) {
        dispatch(stopLoading());
        dispatch({
            type: GET_INGREDIENTS_FAIL,
            payload: {}
        });
        if (err.response.data?.toasts) setToastFromRes(err.response.data?.toasts, dispatch);
    }
};

export const filterIngredients = (ingredients: Ingredient[], name: string | null, id?: string) => (dispatch: ThunkDispatch<State, undefined, IngredientAction>) => {
    let newArr: Ingredient[] = [];
    const regex = (str: string) => RegExp(str, 'gi');
    if (id) newArr = ingredients.filter(ing => regex(id).test(ing._id) ? ing : null);
    else if (name) newArr = ingredients.filter(ing => regex(name).test(ing.name) ? ing : null);
    dispatch({
        type: FILTER_INGREDIENTS,
        payload: newArr
    });
}

export const resetIngredientFilter = () => (dispatch: ThunkDispatch<State, undefined, IngredientAction>) => {
    dispatch({
        type: RESET_FILTER_INGREDIENTS
    })
};