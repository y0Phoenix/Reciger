import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT,
    } from '../actions/types';
    import setAuthToken from '../utils/setAuthToken';
    
    const initialState = {
        token: localStorage.getItem('token'),
        isAuthenticated: false,
        loading: true,
        user: null,
    };
    
    // eslint-disable-next-line import/no-anonymous-default-export
    export default function (state = initialState, action) {
        const { type, payload } = action;
    
        switch (type) {
            case USER_LOADED:
                state = {...state, isAuthenticated: true, loading: false, user:payload}
                return state;
            case REGISTER_SUCCESS:
            case LOGIN_SUCCESS:
                localStorage.setItem('token', payload.token);
                setAuthToken(localStorage.token);
                state = { ...state, ...payload, isAuthenticated: true, loading: false }; 
                return state
            case REGISTER_FAIL:
            case AUTH_ERROR:
            case LOGIN_FAIL:
            case LOGOUT:
                localStorage.removeItem('token');
                setAuthToken(null);
                state = { ...state, token: null, isAuthenticated: false, loading: false, user: null };
                return state
            default:
                return state;
        }
    }
    