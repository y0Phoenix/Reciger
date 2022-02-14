import axios from "axios";
import setAlert from "./alert";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_CATEGORIES,
  CLEAR_INGREDIENTS,
  CLEAR_RECIPES,
  USER_UPDATED,
  USER_UPDATED_FAIL,
  USER_LOADED,
  AUTH_ERROR,
} from "./types";

// load user if local storage token exists
export const login = (formData) => async (dispatch) => {
    try {
        const res = await axios.post('/api/auth', formData);

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: LOGIN_FAIL,
            payload: {msg: err.res, status: err.response.status}
        });
    }
};

export const register = (formData) => async dispatch => {
    try {
        formData.preference = {};
        formData.preference.measurements = [];
        formData.preference.measurements.push(formData.preferedV, formData.preferedW);
        delete formData.preferedV;
        delete formData.preferedW;
        console.log(formData);
        const res = await axios.post('/api/user', formData);

        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        });
    } catch (err) {
        const msgs = err.response.data.msgs;
        if (msgs) {
            msgs.forEach((msg) => dispatch(setAlert(msg.msg, 'error', 7500)));
        }
        dispatch({
            type: REGISTER_FAIL,
            payload: {msg: err.res, status: err.response.status}
        });
    }
};

export const updateUser = (formData) => async dispatch => {
    try {
        const res = await axios.post('/api/user/update', formData);

        dispatch({
            type: USER_UPDATED,
            payload: res.data
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
            type: USER_UPDATED_FAIL,
            payload: {msg: err.res, status: err.response.status}
        });
    }
};

export const logout = () => async dispatch => {
    dispatch({
        type: LOGOUT
    });
    dispatch({
        type: CLEAR_CATEGORIES
    });
    dispatch({
        type: CLEAR_INGREDIENTS
    });
    dispatch({
        type: CLEAR_RECIPES
    });
};

export const loadUser = () => async dispatch => {
    try {
        const token = localStorage.token;
        var res;
        if (!token) {
            res = await axios.get('/api/auth');
        }
        else {
            res = await axios.get(`/api/auth/${token}`);
        }

        dispatch({
            type: USER_LOADED,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: AUTH_ERROR,
            payload: {msg: err.res, status: err.response.status}
        });
    }
}