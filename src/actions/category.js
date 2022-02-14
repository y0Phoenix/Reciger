import { 
    GET_CATEGORIES,
    GET_CATEGORIES_FAIL,
} from "./types";
import axios from "axios";
import setAlert from "./alert";

export const getCategories = () => async (dispatch) => {
    try {
        const res = await axios.get('/api/category');

        dispatch({
            type: GET_CATEGORIES,
            payload: res.data.data
        });
        const msgs = res.data.msgs;
        if (msgs) {
            msgs.forEach((msg) => dispatch(setAlert(msg, 'success', 5000)));
        }
    } catch (err) {
        const msgs = err.response.data.msgs;
        if (msgs) {
            msgs.forEach((msg) => dispatch(setAlert(msg, 'error', 7500)));
        }
        dispatch({
            type: GET_CATEGORIES_FAIL,
            payload: {msg: err.res, status: err.response.status}
        });
    }
};

export const postCategory = (formData) => async dispatch => {
    try {
        const res = await axios.post('/api/category', formData);

        dispatch({
            type: GET_CATEGORIES,
            payload: res.data.data
        });

        const msgs = res.data.msgs;
        if (msgs) {
            msgs.forEach((msg) => dispatch(setAlert(msg, 'success', 5000)));
        }
    } catch (err) {
        const msgs = err.response.data.msgs;
        if (msgs) {
            msgs.forEach((msg) => dispatch(setAlert(msg, 'error', 7500)));
        }
        dispatch({
            type: GET_CATEGORIES_FAIL,
            payload: {msg: err.res, status: err.response.status}
        });
    }
};

export const deleteCategory = (id) => async dispatch => {
    try {
        const res = await axios.delete(`/api/category/${id}`);

        dispatch({
            type: GET_CATEGORIES,
            payload: res.data.data
        });
        const msgs = res.data.msgs;
        if (msgs) {
            msgs.forEach((msg) => dispatch(setAlert(msg, 'success', 5000)));
        }
    } catch (err) {
        const msgs = err.response.data.msgs;
        if (msgs) {
            msgs.forEach((msg) => dispatch(setAlert(msg, 'error', 7500)));
        }
        dispatch({
            type: GET_CATEGORIES_FAIL,
            payload: {msg: err.res, status: err.response.status}
        });
    }
}