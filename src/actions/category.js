import { 
    GET_CATEGORIES,
    GET_CATEGORIES_FAIL,
} from "./types";
import axios from "axios";
import {setAlert} from "./alert";

export const getCategories = (setShowModal, showModal) => async (dispatch) => {
    try {
        const token = localStorage.token;
        if (!token) {
            return;
        }
        const res = await axios.get('/api/category', {
            headers: {
                "x-auth-token": token
            }
        });

        dispatch({
            type: GET_CATEGORIES,
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
            type: GET_CATEGORIES_FAIL,
            payload: {msg: err.response, status: err.response.status}
        });
    }
};

export const postCategory = (formData, setShowModal, showModal) => async dispatch => {
    try {
        console.log(formData);
        const res = await axios.post('/api/category', formData);

        dispatch({
            type: GET_CATEGORIES,
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
            type: GET_CATEGORIES_FAIL,
            payload: {msg: err.res, status: err.response.status}
        });
    }
};

export const deleteCategory = (formData, setShowModal, showModal) => async dispatch => {
    try {
        const res = await axios.delete(`/api/category`, formData);

        dispatch({
            type: GET_CATEGORIES,
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
            type: GET_CATEGORIES_FAIL,
            payload: {msg: err.res, status: err.response.status}
        });
    }
}