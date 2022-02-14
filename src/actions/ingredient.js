import { 
    GET_INGREDIENTS,
    GET_INGREDIENTS_FAIL
} from "./types";
import axios from "axios";
import setAlert from "./alert";

export const getIngredients = (all = false, id)  => async (dispatch) => {
    try {
        var res;
        if (id) {
            res = await axios.get(`/api/ingredient/${id}`);
        }
        else {
            res = await axios.get(`/api/ingredient?all=${all}`);
        }

        dispatch({
            type: GET_INGREDIENTS,
            payload: res.data.data
        });
        const msgs = res.data.msgs;
        if (msgs) {
            msgs.forEach(msg => dispatch(setAlert(msg, 'success', 5000)));
        }
    } catch (err) {
        const msgs = err.response.data.msgs;
        if (msgs) {
            msgs.forEach((msg) => dispatch(setAlert(msg, 'error', 7500)));
        } 
        dispatch({
            type: GET_INGREDIENTS_FAIL,
            payload: {msg: err.res, status: err.response.status}
        });
    }
};

export const postIngredient = (formData, noNut = false, update = false) => async dispatch => {
    try {
        var res;
        if (update) {
            res = await axios.post(`/api/ingredient/update`, formData);
        }
        else {
            res = await axios.post(`/api/ingredient?noNut=${noNut}`, formData);
        }

        dispatch({
            type: GET_INGREDIENTS,
            payload: res.data.data
        });
        const msgs = res.data.msgs;
        if (msgs) {
            msgs.forEach(msg => dispatch(setAlert(msg, 'success', 5000)));
        }
    } catch (err) {
        const msgs = err.response.data.msgs;
        if (msgs) {
            msgs.forEach((msg) => dispatch(setAlert(msg, 'error', 7500)));
        } 
        dispatch({
            type: GET_INGREDIENTS_FAIL,
            payload: {msg: err.res, status: err.response.status}
        });
    }
}

export const deleteIngredient = (id) => dispatch => {
    try {
        const res = await axios.delete(`/api/ingredient/${id}`);

        dispatch({
            type: GET_INGREDIENTS,
            payload: res.data.data
        });
        const msgs = res.data.msgs;
        if (msgs) {
            msgs.forEach(msg => dispatch(setAlert(msg, 'success', 5000)));
        }
    } catch (err) {
        const msgs = err.response.data.msgs;
        if (msgs) {
            msgs.forEach((msg) => dispatch(setAlert(msg, 'error', 7500)));
        }
        dispatch({
            type: GET_INGREDIENTS_FAIL,
            payload: {msg: err.res, status: err.response.status}
        });
    }
}