import { 
    GET_CATEGORIES,
    GET_CATEGORIES_FAIL,
} from "./types";
import axios from "axios";
import {setAlert} from "./alert";

export const getCategories = (setShowModal) => async (dispatch) => {
    try {
        const res = await axios.get('/api/category');

        dispatch({
            type: GET_CATEGORIES,
            payload: res.data.data
        });
        const msgs = res.data.msgs;
        if (msgs) {
            msgs.forEach((msg) => dispatch(setAlert(msg.msg, 'success', setShowModal)));
        }
    } catch (err) {
        const msgs = err.response.data.msgs;
        if (msgs) {
            msgs.forEach((msg) => dispatch(setAlert(msg.msg, 'error', setShowModal)));
        }
        dispatch({
            type: GET_CATEGORIES_FAIL,
            payload: {msg: err.response, status: err.response.status}
        });
    }
};

export const postCategory = (formData, setShowModal) => async dispatch => {
    try {
        const res = await axios.post('/api/category', formData);

        dispatch({
            type: GET_CATEGORIES,
            payload: res.data.data
        });

        const msgs = res.data.msgs;
        if (msgs) {
            msgs.forEach((msg) => dispatch(setAlert(msg.msg, 'success', setShowModal)));
        }
    } catch (err) {
        const msgs = err.response.data.msgs;
        if (msgs) {
            msgs.forEach((msg) => dispatch(setAlert(msg.msg, 'error', setShowModal)));
        }
        dispatch({
            type: GET_CATEGORIES_FAIL,
            payload: {msg: err.res, status: err.response.status}
        });
    }
};

export const deleteCategory = (id, setShowModal) => async dispatch => {
    try {
        const res = await axios.delete(`/api/category/${id}`);

        dispatch({
            type: GET_CATEGORIES,
            payload: res.data.data
        });
        const msgs = res.data.msgs;
        if (msgs) {
            msgs.forEach((msg) => dispatch(setAlert(msg.msg, 'success', setShowModal)));
        }
    } catch (err) {
        const msgs = err.response.data.msgs;
        if (msgs) {
            msgs.forEach((msg) => dispatch(setAlert(msg.msg, 'error', setShowModal)));
        }
        dispatch({
            type: GET_CATEGORIES_FAIL,
            payload: {msg: err.res, status: err.response.status}
        });
    }
}