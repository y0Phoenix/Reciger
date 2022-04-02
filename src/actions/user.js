import axios from "axios";
import {setAlert} from "./alert";
import { loading, stopLoading } from "./loading";
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
export const login = (formData, setShowModal, showModal) => async (dispatch) => {
    try {
        dispatch(loading());
        const res = await axios.post(`/api/auth?remember=${formData.remeber}`, formData);
        dispatch(stopLoading());

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });
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
            type: LOGIN_FAIL,
            payload: {msg: err.res, status: err.response.status}
        });
    }
};

export const register = (formData, setShowModal, showModal) => async dispatch => {
    try {
        formData.preference = {};
        formData.preference.measurements = [];
        formData.preference.measurements.push(formData.preferedV, formData.preferedW);
        delete formData.preferedV;
        delete formData.preferedW;
        dispatch(loading());
        const res = await axios.post('/api/user', formData);
        dispatch(verifyEmail(formData.email, null, null, setShowModal, showModal));
        dispatch(stopLoading());

        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        });
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
            type: REGISTER_FAIL,
            payload: {msg: err.res, status: err.response.status}
        });
    }
};

export const updateUser = (formData, setShowModal, showModal) => async dispatch => {
    try {
        dispatch(loading());
        const res = await axios.post('/api/user/update', formData);
        dispatch(stopLoading());
        dispatch({
            type: USER_UPDATED,
            payload: res.data
        });
        const msgs = res.data.msgs;
        if (msgs) {
            msgs.forEach((msg) => dispatch(setAlert(msg.msg, 'success', setShowModal, showModal)));
        }
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
        dispatch(loading());
        if (!token) {
            res = await axios.get('/api/auth');
        }
        else {
            res = await axios.get(`/api/auth/get/${token}`);
        }
        dispatch(stopLoading());
        dispatch({
            type: USER_LOADED,
            payload: res.data
        });
    } catch (err) {
        dispatch(stopLoading());
        dispatch({
            type: AUTH_ERROR,
            payload: {msg: err.res, status: err.response.status}
        });
    }
};

export const deleteUser = ({setShowModal, showModal, setNavigate}) => async dispatch => {
    try {
        dispatch(loading());
        const res = await axios.delete('/api/user');
        dispatch(stopLoading());
        const msgs = res.data.msgs;
        msgs.forEach(msg => dispatch(setAlert(msg.msg, 'success', setShowModal, showModal)));
        setNavigate('/');
    } catch (err) {
        dispatch(stopLoading());
        if (!err?.response) return dispatch(setAlert('Error Try Again Later', 'error', setShowModal, showModal));
        const msgs = err.response.data.msgs;
        if (msgs.constructor !== Array) return dispatch(setAlert('Error Try Again Later', 'error', setShowModal, showModal));
        msgs.forEach(msg => dispatch(setAlert(msg.msg, 'error', setShowModal, showModal)));
    }
}

export const changePasswordReq = (email, setShowModal, showModal) => async dispatch => {
    try {
        const token = localStorage.token;
        if (!token) return dispatch(setAlert('Error Try Again Later', 'error', setShowModal, showModal));
        dispatch(loading());
        await axios.get(`/api/auth/passwordreq?email=${email}`);
        dispatch(stopLoading());
        dispatch(setAlert('Please Check Your Email For A Link To Change Password', 'success', setShowModal, showModal));
        return true;
    } catch (err) {
        dispatch(stopLoading());
        if (!err?.response) return dispatch(setAlert('Error Try Again Later', 'error', setShowModal, showModal));
        const msgs = err.response.data.msgs;
        if (msgs.constructor !== Array) return dispatch(setAlert('Error Try Again Later', 'error', setShowModal, showModal));
        msgs.forEach(msg => dispatch(setAlert(msg.msg, 'error', setShowModal, showModal)));
        return null;
    }
};

export const changePasswordToken = (token, newPass, setShowModal, showModal) => async dispatch => {
    try {
        if (!token) return;
        dispatch(loading());
        const res = await axios.post(`/api/auth/changepassword/${token}`, 
            {
                newPass: newPass
            }
        );
        dispatch(stopLoading());
        res.data.msgs.forEach(msg => dispatch(setAlert(msg.msg, 'success', setShowModal, showModal)));
        return true;
    } catch (err) {
        dispatch(stopLoading());
        if (!err?.response) return dispatch(setAlert('Error Try Again Later', 'error', setShowModal, showModal));
        const msgs = err.response.data.msgs;
        if (msgs.constructor !== Array) return dispatch(setAlert('Error Try Again Later', 'error', setShowModal, showModal));
        msgs.forEach(msg => dispatch(setAlert(msg.msg, 'success', setShowModal, showModal)));
        return null;
    }
};

export const verifyEmail = (email, original, update, setShowModal, showModal) => async dispatch => {
    try {
        if (update) await axios.post('/api/user/update', update);
        dispatch(loading());
        const res = await axios.post('/api/auth/email', {email, original});
        dispatch(stopLoading());
        const msgs = res.data.msgs;
        if (msgs) msgs.forEach(msg => dispatch(setAlert(msg.msg, 'success', setShowModal, showModal)));
    } catch (err) {
        dispatch(stopLoading());
        if (!err.response) return dispatch(setAlert('Error Try Again Later', 'error', setShowModal, showModal));
        const msgs = err.response.data.msgs;
        if (msgs.constructor !== Array) return dispatch(setAlert('Error Try Again Later', 'error', setShowModal, showModal));
        msgs.forEach(msg => dispatch(setAlert(msg.msg, 'error', setShowModal, showModal)));
    }
};

export const verifyEmailFinish = (token, setShowModal, showModal) => async dispatch => {
    try {
        dispatch(loading());
        const res = await axios.get(`/api/auth/email/${token}`);
        dispatch(stopLoading());
        const msgs = res.data.msgs;
        if (msgs) msgs.forEach(msg => dispatch(setAlert(msg.msg, 'success', setShowModal, showModal)));
    } catch (err) {
        dispatch(stopLoading());
        if (!err.response) return dispatch(setAlert('Error Try Again Later', 'error', setShowModal, showModal));
        const msgs = err.response.data.msgs;
        if (msgs.constructor !== Array) return dispatch(setAlert('Error Try Again Later', 'error', setShowModal, showModal));
        msgs.forEach(msg => dispatch(setAlert(msg.msg, 'error', setShowModal, showModal)));
    }
}