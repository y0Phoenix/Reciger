import axios from "axios"
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_CATEGORIES,
  CLEAR_INGREDIENTS,
  CLEAR_RECIPES,
} from "./types";

// load user if local storage token exists
export const loadUser = () => async (dispatch) => {
    try {
        const res = await axios.get('/api/user');

        dispatch({
            type: USER_LOADED,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: AUTH_ERROR,
        })
    }
};