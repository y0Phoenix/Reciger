import { 
    GET_RECIPES,
    GET_RECIPES_FAIL,
    SetShowModal,
} from "./types";
import axios from "axios";
import {setAlert} from "./alert";
import { loading, stopLoading } from "./loading";
import ShowModal from "../types/ShowModal";
import { Ingredient, RecipeIngredient } from "../types/Ingredient";
import { ThunkDispatch } from "redux-thunk";
import State from "../types/State";
import { RecipeAction } from "../types/Recipe";


// get recipes with all as the query for recieving all the recipe data or just the id, name, categories, user
export const getRecipes = (all = false, id: string | null, state: boolean, setShowModal: SetShowModal, showModal: ShowModal) => async (dispatch: any) => {
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
        var res;
        dispatch(loading());
        if (id) {
            res = await axios.get(`/api/recipe/${id}`, headers);
        }
        else {
            res = await axios.get(`/api/recipe?all=${all}`, headers);
        }
        dispatch(stopLoading());
        if (state) {
            dispatch({
                type: GET_RECIPES,
                payload: res.data.data
            });
            const msgs = res.data.msgs;
            if (msgs) {
                msgs.forEach((msg: any) => {
                    if (msg.msg.includes('Successfully')) return;
                    dispatch(setAlert(msg.msg, 'success', setShowModal, showModal))
                });
            }
        }
        return res.data.data
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
            type: GET_RECIPES_FAIL,
            payload: {msg: err.res, status: err.response.status}
        });
        return null;
    }
};

interface ingredient extends Ingredient {
    instructions: string
};

interface FormData {
    formData: {
      name: string,
        instructions: string,
        Yield: {
          number: number,
          string: string
        },
        yield?: {
            number: number,
            string: string
        }
        categories: string[],
        Correlative: boolean,
        Price: string,
        ingredients: RecipeIngredient[]
    },
    ingData: RecipeIngredient[],
    ingredients: Ingredient[]
};

export const postRecipe = (FormData: FormData, update = false, setShowModal: SetShowModal, showModal: ShowModal) => async (dispatch: any) => {
    const {formData, ingData, ingredients,} = FormData;
    try {
        formData.ingredients = ingData.map((ing) => {
            const index = ingredients.map(ingredient => ingredient.name.toLowerCase()).indexOf(ing.name.toLowerCase());
            let ingredient: ingredient = {...ingredients[index], quantity: ing.quantity, instructions: ing.instructions};
            return ingredient;
        });
        formData.yield = {...formData.Yield};
        dispatch(loading());
        const res = await axios.post(`/api/recipe?update=${update}&correlative=${formData.Correlative}`, formData);
        dispatch(stopLoading());

        dispatch({
            type: GET_RECIPES,
            payload: res.data.data
        });
        const msgs = res.data.msgs;
        if (msgs) {
            msgs.forEach((msg: any) => {
                dispatch(setAlert(msg.msg, 'success', setShowModal, showModal))
            });
        }
        return res.data.data
    } catch (err: any) {
        dispatch(stopLoading());
        if (err?.response) {
            const msgs = err.response.data.msgs;
            if (msgs) {
                msgs.forEach((msg: any) => dispatch(setAlert(msg.msg, 'error', setShowModal, showModal)));
            }
            else {
                dispatch(setAlert('Server Error Try Again Later', 'error', setShowModal, showModal));
            }
            dispatch({
                type: GET_RECIPES_FAIL,
                payload: {msg: err.res, status: err.response.status}
            });
        }
        return null;
    }
};

interface DeleteRecipeProps {
    id: string,
    setShowModal: SetShowModal,
    showModal: ShowModal
};

export const deleteRecipe = ({id, setShowModal, showModal}: DeleteRecipeProps) => async (dispatch: ThunkDispatch<State, undefined, RecipeAction>) => {
    try {
        dispatch(loading());
        const res = await axios.delete(`/api/recipe/${id}`);
        dispatch(stopLoading());

        dispatch({
            type: GET_RECIPES,
            payload: res.data.data
        });
        const msgs = res.data.msgs;
        if (msgs) {
            msgs.forEach((msg: any) => dispatch(setAlert(msg.msg, 'success', setShowModal, showModal)));
        }
    } catch (err: any) {
        dispatch(stopLoading());
        if (err.response) {
            const msgs = err.response.data.msgs;
            if (msgs) {
                msgs.forEach((msg: any) => dispatch(setAlert(msg.msg, 'error', setShowModal, showModal)));
            }
            else {
                dispatch(setAlert('Server Error Try Again Later', 'error', setShowModal, showModal));
            }
        }
        dispatch({
            type: GET_RECIPES_FAIL,
            payload: err.response.data
        });
    }
};