import { 
    GET_INGREDIENT,
    GET_INGREDIENTS,
    GET_INGREDIENTS_FAIL
} from "./types";
import axios from "axios";
import {setAlert} from "./alert";
import { loading, stopLoading } from "./loading";

export const getIngredients = (all = false, id, setShowModal, showModal, state = false)  => async (dispatch) => {
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
                    payload: res.data.data
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
    } catch (err) {
        const msgs = err.response.data.msgs;
        dispatch(stopLoading());
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

export const postIngredient = (formData, noNut = false, setShowModal, showModal, state, all = false) => async dispatch => {
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
                msgs.forEach(msg => dispatch(setAlert(msg.msg, 'success', setShowModal, showModal)));
            }
        }
        return res.data.data;
    } catch (err) {
        dispatch(stopLoading());
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

export const updateIngredient = (formData, id, all, noNut, setShowModal, showModal) => async dispatch => {
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
            msgs.forEach(msg => dispatch(setAlert(msg.msg, 'success', setShowModal, showModal)));
        }
    } catch (err) {
        dispatch(stopLoading());
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

export const deleteIngredient = ({id, setShowModal, showModal}) => async dispatch => {
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
            msgs.forEach(msg => dispatch(setAlert(msg.msg, 'success', setShowModal, showModal)));
        }
    } catch (err) {
        dispatch(stopLoading());
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