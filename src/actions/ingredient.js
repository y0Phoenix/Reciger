import { 
    GET_INGREDIENTS,
    GET_INGREDIENTS_FAIL
} from "./types";
import axios from "axios";
import {setAlert} from "./alert";

export const getIngredients = (all = false, id, setShowModal, showModal, state)  => async (dispatch) => {
    try {
        var res;
        if (id) {
            res = await axios.get(`/api/ingredient/${id}`);
        }
        else {
            res = await axios.get(`/api/ingredient?all=${all}`);
        }
        if (state) {
            dispatch({
                type: GET_INGREDIENTS,
                payload: res.data.data
            });
        }
        return res.data.data;
    } catch (err) {
        const msgs = err.response.data.msgs;
        if (msgs) {
            msgs.forEach((msg) => dispatch(setAlert(msg.msg, 'error', setShowModal, showModal)));
        } 
        else {
            dispatch(setAlert('Server Error Try Again Later', 'error', setShowModal, showModal));
        }
        dispatch({
            type: GET_INGREDIENTS_FAIL,
            payload: {msg: err.res, status: err.response.status}
        });
        return null;
    }
};

export const postIngredient = (formData, noNut = false, update = false, setShowModal, showModal, state, all = false) => async dispatch => {
    try {
        var res;
        if (update) {
            res = await axios.post(`/api/ingredient/update?all=${all}`, formData);
        }
        else {
            res = await axios.post(`/api/ingredient?noNut=${noNut}&all=${all}`, formData);
        }
        if (state) {
            dispatch({
                type: GET_INGREDIENTS,
                payload: res.data.data
            });
            const msgs = res.data.msgs;
            if (msgs) {
                msgs.forEach(msg => dispatch(setAlert(msg.msg, 'success', setShowModal, showModal)));
            }
        }
        return res.data.data;
    } catch (err) {
        const msgs = err.response.data.msgs;
        if (msgs) {
            msgs.forEach((msg) => dispatch(setAlert(msg.msg, 'error', setShowModal, showModal)));
        }
        else {
            dispatch(setAlert('Server Error Try Again Later', 'error', setShowModal, showModal));
        } 
        dispatch({
            type: GET_INGREDIENTS_FAIL,
            payload: {msg: err.res, status: err.response.status}
        });
        return null
    }
}

export const deleteIngredient = (id, setShowModal, showModal) => async dispatch => {
    try {
        const res = await axios.delete(`/api/ingredient/${id}`);

        dispatch({
            type: GET_INGREDIENTS,
            payload: res.data.data
        });
        const msgs = res.data.msgs;
        if (msgs) {
            msgs.forEach(msg => dispatch(setAlert(msg.msg, 'success', setShowModal, showModal)));
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
            type: GET_INGREDIENTS_FAIL,
            payload: {msg: err.res, status: err.response.status}
        });
    }
}