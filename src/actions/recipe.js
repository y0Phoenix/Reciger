import { 
    GET_RECIPES,
    GET_RECIPES_FAIL,
} from "./types";
import axios from "axios";
import setAlert from "./alert";

// get recipes with all as the query for recieving all the recipe data or just the id, name, categories, user
export const getRecipes = (all = false, id) => async (dispatch) => {
    try {
        var res;
        if (id) {
            res = await axios.get(`/api/recipe/${id}`);
        }
        else {
            res = await axios.get(`/api/recipe?all=${all}`);
        }
        
        dispatch({
            type: GET_RECIPES,
            payload: res.data.data
        });
        const msgs = res.data.msgs;
        if (msgs) {
            msgs.forEach((msg) => dispatch(setAlert(msg.msg, 'success', 5000)));
        }
    } catch (err) {
        const msgs = err.response.data.msgs;
        if (msgs) {
            msgs.forEach((msg) => dispatch(setAlert(msg.msg, 'error', 7500)));
        }
        dispatch({
            type: GET_RECIPES_FAIL,
            payload: {msg: err.res, status: err.response.status}
        });
    }
};

export const postRecipe = (formData, update = false) => async dispatch => {
    try {
        const res = await axios.post(`/api/recipe?update=${update}`, formData);

        dispatch({
            type: GET_RECIPES,
            payload: res.data.data
        });
        const msgs = res.data.msgs;
        if (msgs) {
            msgs.forEach((msg) => dispatch(setAlert(msg.msg, 'success', 5000)));
        }
    } catch (err) {
        const msgs = err.response.data.msgs;
        if (msgs) {
            msgs.forEach((msg) => dispatch(setAlert(msg.msg, 'error', 7500)));
        }
        dispatch({
            type: GET_RECIPES_FAIL,
            payload: {msg: err.res, status: err.response.status}
        });
    }
};

export const deleteRecipe = (id) => async dispatch => {
    try {
        const res = await axios.delete(`/api/recipe/${id}`);

        dispatch({
            type: GET_RECIPES,
            payload: res.data.data
        });
        const msgs = res.data.msgs;
        if (msgs) {
            msgs.forEach((msg) => dispatch(setAlert(msg.msg, 'success', 5000)));
        }
    } catch (err) {
        const msgs = err.response.data.msgs;
        if (msgs) {
            msgs.forEach((msg) => dispatch(setAlert(msg.msg, 'error', 7500)));
        }
        dispatch({
            type: GET_RECIPES_FAIL,
            payload: {msg: err.res, status: err.response.status}
        });
    }
};