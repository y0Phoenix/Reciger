import { 
    FILTER_RECIPES,
    GET_RECIPES,
    GET_RECIPES_FAIL,
    RESET_FILTER_RECIPES
} from "./types";
import axios from "axios";
import { loading, stopLoading } from "./loading";
import { Ingredient, RecipeIngredient } from "../types/Ingredient";
import { ThunkDispatch } from "redux-thunk";
import State from "../types/State";
import { Recipe, RecipeAction } from "../types/Recipe";
import { NavigateFunction } from "react-router-dom";
import React from "react";
import setToastFromRes from "../functions/setToastFromRes";


// get recipes with all as the query for recieving all the recipe data or simplified data for speed
export const getRecipes = (all = false) => async (dispatch: ThunkDispatch<State, undefined, RecipeAction>) => {
    try {
        const token = localStorage.token;
        if (!token) {
            return;
        }
        const headers = {
            headers: {
                "x-auth-token": token
            }
        };
        dispatch(loading());
        const res = await axios.get(`/api/recipe?all=${all}`, headers);
        dispatch(stopLoading());

        if (res.data.toasts) setToastFromRes(res.data.toasts, dispatch);

        dispatch({
            type: GET_RECIPES,
            payload: res.data.data
        });
    } catch (err: any) {
        dispatch(stopLoading());
        dispatch({
            type: GET_RECIPES_FAIL,
            payload: err.response.data
        });
        if (err.response.data?.toasts) setToastFromRes(err.response.data?.toasts, dispatch);
    }
};

export const getRecipeByID = (id: string) => async (dispatch: ThunkDispatch<State, undefined, RecipeAction>) => {
    try {
        dispatch(loading());
        const res = await axios.get(`/api/recipe/${id}`);
        dispatch(stopLoading());
        
        if (res.data.toasts) setToastFromRes(res.data.toasts, dispatch);

        dispatch({
            type: FILTER_RECIPES,
            payload: [res.data.data]
        });

    } catch (err: any) {
        dispatch(stopLoading());
        dispatch({
            type: GET_RECIPES_FAIL,
            payload: err.response.data
        });
        if (err.response.data?.toasts) setToastFromRes(err.response.data?.toasts, dispatch);
    }
}

export const postRecipe = (recipe: Recipe, ingredients: Ingredient[], update: boolean, navigate: NavigateFunction, setState: React.Dispatch<React.SetStateAction<Recipe>>) => async (dispatch: any) => {
    try {
        recipe.ingredients = recipe.ingredients.filter(ing => (ing.name) ? ing : null).map((ing) => {
            const index = ingredients.map(ingredient => ingredient.name.toLowerCase()).indexOf(ing.name.toLowerCase());
            let ingredient: RecipeIngredient = {...ingredients[index], quantity: ing.quantity, instructions: ing.instructions};
            return ingredient;
        });
        dispatch(loading());
        console.log(recipe);
        const res = await axios.post(`/api/recipe?update=${update}&correlative=${recipe.type == 'ingredient'}`, recipe);
        dispatch(stopLoading());
        dispatch(getRecipes(true));
        if (!update) navigate(`/recipe/${res.data.data._id}`);
        else setState(res.data.data);
        if (res.data.toasts) setToastFromRes(res.data.toasts, dispatch);
    } catch (err: any) {
        dispatch(stopLoading());
        if (err?.response) {
            dispatch({
                type: GET_RECIPES_FAIL,
                payload: {msg: err.res, status: err.response.status}
            });
            if (err.response.data?.toasts) setToastFromRes(err.response.data?.toasts, dispatch);
        }
    }
};

export const deleteRecipe = (id: string) => async (dispatch: ThunkDispatch<State, undefined, RecipeAction>) => {
    try {
        dispatch(loading());
        const res = await axios.delete(`/api/recipe/${id}`);
        dispatch(stopLoading());
        if (res.data.toasts) setToastFromRes(res.data.toasts, dispatch);
        dispatch({
            type: GET_RECIPES,
            payload: res.data.data
        });
    } catch (err: any) {
        dispatch(stopLoading());
        if (err.response.data?.toasts) setToastFromRes(err.response.data?.toasts, dispatch);
        dispatch({
            type: GET_RECIPES_FAIL,
            payload: err.response.data
        });
    }
};

export const filterRecipes = (recipes: Recipe[], name: string | null, id?: string) => (dispatch: ThunkDispatch<State, undefined, RecipeAction>) => {
    let newArr: Recipe[] = [];
    const regex = (str: string) => RegExp(str, 'gi');
    if (id) newArr = recipes.filter(rec => regex(id).test(rec._id) ? rec : null);
    else if (name) newArr = recipes.filter(rec => regex(name).test(rec.name) ? rec : null);
    dispatch({
        type: FILTER_RECIPES,
        payload: newArr
    });
};

export const resetRecipeFilter = () => (dispath: ThunkDispatch<State, undefined, any>) => {
    dispath({
        type: RESET_FILTER_RECIPES,
    });
}