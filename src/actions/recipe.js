import { 
    GET_RECIPES,
    GET_RECIPES_FAIL,
} from "./types";
import axios from "axios";
import {setAlert} from "./alert";

// get recipes with all as the query for recieving all the recipe data or just the id, name, categories, user
export const getRecipes = (all = false, id, state, setShowModal, showModal) => async (dispatch) => {
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
        if (id) {
            res = await axios.get(`/api/recipe/${id}`, headers);
        }
        else {
            res = await axios.get(`/api/recipe?all=${all}`, headers);
        }
        if (state) {
            dispatch({
                type: GET_RECIPES,
                payload: res.data.data
            });
            const msgs = res.data.msgs;
            if (msgs) {
                msgs.forEach((msg) => dispatch(setAlert(msg.msg, 'success', setShowModal, showModal)));
            }
        }
        return res.data.data
    } catch (err) {
        const msgs = err.response.data.msgs;
        if (msgs) {
            msgs.forEach((msg) => dispatch(setAlert(msg.msg, 'error', setShowModal, showModal)));
        }
        else {
            dispatch(setAlert('Server Error Try Again Later', 'error', setShowModal, showModal));
        }
        dispatch({
            type: GET_RECIPES_FAIL,
            payload: {msg: err.res, status: err.response.status}
        });
    }
};

export const postRecipe = (FormData, update = false, setShowModal, showModal) => async dispatch => {
    const {formData, ingData, ingredients} = FormData;
    try {
        formData.ingredients = ingData.map((ing, i, arr) => {
            const index = ingredients.map(ingredient => {
                return ingredient.name.toLowerCase()}).indexOf(ing.name.toLowerCase());
            let ingredient = {...ingredients[index]};
            ingredient.quantity = ing.quantity;
            return ingredient;
        });
        formData.yield = {...formData.Yield};
        const res = await axios.post(`/api/recipe?update=${update}`, formData);

        dispatch({
            type: GET_RECIPES,
            payload: res.data.data
        });
        const msgs = res.data.msgs;
        if (msgs) {
            msgs.forEach((msg) => dispatch(setAlert(msg.msg, 'success', setShowModal, showModal)));
        }
    } catch (err) {
        console.log(err);
        const msgs = err.response.data.msgs;
        if (msgs) {
            msgs.forEach((msg) => dispatch(setAlert(msg.msg, 'error', setShowModal, showModal)));
        }
        else {
            dispatch(setAlert('Server Error Try Again Later', 'error', setShowModal, showModal));
        }
        dispatch({
            type: GET_RECIPES_FAIL,
            payload: {msg: err.res, status: err.response.status}
        });
    }
};

export const deleteRecipe = (id, setShowModal, showModal) => async dispatch => {
    try {
        const res = await axios.delete(`/api/recipe/${id}`);

        dispatch({
            type: GET_RECIPES,
            payload: res.data.data
        });
        const msgs = res.data.msgs;
        if (msgs) {
            msgs.forEach((msg) => dispatch(setAlert(msg.msg, 'success', setShowModal, showModal)));
        }
    } catch (err) {
        const msgs = err.response.data.msgs;
        if (msgs) {
            msgs.forEach((msg) => dispatch(setAlert(msg.msg, 'error', setShowModal, showModal)));
        }
        else {
            dispatch(setAlert('Server Error Try Again Later', 'error', setShowModal, showModal));
        }
        dispatch({
            type: GET_RECIPES_FAIL,
            payload: {msg: err.res, status: err.response.status}
        });
    }
};