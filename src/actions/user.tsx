import axios, { Axios, AxiosError } from "axios";
import React from "react";
import { NavigateFunction } from "react-router-dom";
import setToastFromRes from "../functions/setToastFromRes";
import { RegisterFormData } from "../layout/Register";
import ShowModal from "../types/ShowModal";
import { Toast } from "../types/Toast";
import { User } from "../types/User";
import {setAlert} from "./alert";
import { loading, stopLoading } from "./loading";
import { setToast } from "./toast";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_INGREDIENTS,
  CLEAR_RECIPES,
  USER_UPDATED,
  USER_UPDATED_FAIL,
  USER_LOADED,
  AUTH_ERROR
} from "./types";

interface FormData {
    email: string,
    password: string,
    remeber: boolean
};

// load user if local storage token exists
export const login = (formData: FormData, navigate: NavigateFunction) => async (dispatch: any) => {
    try {
        dispatch(loading());
        const res = await axios.post(`/api/auth?remember=${formData.remeber}`, formData);
        dispatch(stopLoading());
        navigate('/dashboard');
        
        if (res.data.toasts) setToastFromRes(res.data.toasts, dispatch);
        
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });
    } catch (err: any) {
        dispatch(stopLoading());
       console.log(err);
       if (err.response.data?.toasts) setToastFromRes(err.response.data?.toasts, dispatch);
    }
};

export const register = (formData: RegisterFormData, navigate: NavigateFunction) => async (dispatch: any) => {
    try {
        dispatch(loading());
        const res = await axios.post('/api/user', formData);
        dispatch(verifyEmail(formData.email, formData.email, {name: formData.name}));
        dispatch(stopLoading());
        navigate('/dashboard');

        if (res.data.toasts) setToastFromRes(res.data.toasts, dispatch);

        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        });
    } catch (err: any) {
        dispatch(stopLoading());
        if (err.response.data?.toasts) setToastFromRes(err.response.data?.toasts, dispatch);
        dispatch({
            type: REGISTER_FAIL,
            payload: {msg: err.res, status: err.response.status}
        });
    }
};

export const updateUser = (user: User) => async (dispatch: any) => {
    try {
        dispatch(loading());
        const res = await axios.post('/api/user/update', user);
        dispatch(stopLoading());
        if (res.data.toasts) setToastFromRes(res.data.toasts, dispatch);
        dispatch({
            type: USER_UPDATED,
            payload: res.data
        });
    } catch (err: any) {
        if (err.response.data?.toasts) setToastFromRes(err.response.data?.toasts, dispatch);
        dispatch(stopLoading());
        dispatch({
            type: USER_UPDATED_FAIL,
            payload: {msg: err.res, status: err.response.status}
        });
    }
};

export const logout = () => async (dispatch: any) => {
    dispatch({
        type: LOGOUT
    });
    // dispatch({
    //     type: CLEAR_CATEGORIES
    // });
    dispatch({
        type: CLEAR_INGREDIENTS
    });
    dispatch({
        type: CLEAR_RECIPES
    });
};

export const loadUser = () => async (dispatch: any) => {
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
    } catch (err: any) {
        dispatch(stopLoading());
        dispatch({
            type: AUTH_ERROR,
            payload: {msg: err.res, status: err.response.status}
        });
    }
};

export const deleteUser = (navigate: NavigateFunction) => async (dispatch: any) => {
    try {
        dispatch(loading());
        const res = await axios.delete('/api/user');
        dispatch(stopLoading());
        if (res.data.toasts) setToastFromRes(res.data.toasts, dispatch);
        navigate('/');
    } catch (err: any) {
        dispatch(stopLoading());
        if (err.response.data?.toasts) setToastFromRes(err.response.data?.toasts, dispatch);
    }
}

export const changePasswordReq = (email: string) => async (dispatch: any) => {
    try {
        dispatch(loading());
        await axios.get(`/api/auth/passwordreq?email=${email}`);
        dispatch(stopLoading());
        dispatch(setToast(new Toast({
            autoHide: false,
            bg: 'info',
            body: `An Email Has Been Send To ${email}
            Check Your Email For A Link To Change Your Password`,
            dispatcher: dispatch
        })));
        return true;
    } catch (err: any) {
        dispatch(stopLoading());
        if (err.response.data?.toasts) setToastFromRes(err.response.data?.toasts, dispatch);
        return null;
    }
};

export const changePasswordToken = (token: string, newPass: string) => async (dispatch: any) => {
    try {
        if (!token) return;
        dispatch(loading());
        const res = await axios.post(`/api/auth/changepassword/${token}`, 
            {
                newPass: newPass
            }
        );
        dispatch(stopLoading());
        if (res.data.toasts) setToastFromRes(res.data.toasts, dispatch);
        return true;
    } catch (err: any) {
        dispatch(stopLoading());
        if (err.response.data?.toasts) setToastFromRes(err.response.data?.toasts, dispatch);
        return null;
    }
};

interface Update {
    name: string
};

/**
 * 
 * @param email the new email to set 
 * @param original the old user email
 * @param update the updated user info if any, giving the same info wont change anything
 */
export const verifyEmail = (email: string, original: string, update: Update) => async (dispatch: any) => {
    try {
        if (update) await axios.post('/api/user/update', update);
        dispatch(loading());
        const res = await axios.post('/api/auth/email', {email, original});
        if (res.data.toasts) setToastFromRes(res.data.toasts, dispatch);
        dispatch(stopLoading());
    } catch (err: any) {
        dispatch(stopLoading());
        if (err.response.data?.toasts) setToastFromRes(err.response.data?.toasts, dispatch);
    }
};

export const verifyEmailFinish = (token: string) => async (dispatch: any) => {
    try {
        dispatch(loading());
        const res = await axios.get(`/api/auth/email/${token}`);
        dispatch(stopLoading());
        if (res.data.toasts) setToastFromRes(res.data.toasts, dispatch);
    } catch (err: any) {
        dispatch(stopLoading());
        if (err.response.data?.toasts) setToastFromRes(err.response.data?.toasts, dispatch);
    }
}