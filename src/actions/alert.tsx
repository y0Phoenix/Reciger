import { 
    SET_ALERT,
    REMOVE_ALERT
} from "./types";
// import {v4 as uuid} from 'uuid';
import ShowModal from "../types/ShowModal";
import { ThunkDispatch } from "redux-thunk";
import State from "../types/State";
import { AlertAction } from "../types/Alert";

export const setAlert = (msg: string, type: string) => (dispatch: ThunkDispatch<State, undefined, AlertAction>) => {
    // const id = uuid();
    dispatch({
        type: SET_ALERT,
        payload: {msg, type}
    });
};

export const removeAlert = () => (dispatch: ThunkDispatch<State, undefined, AlertAction>) => {
    dispatch({
        type: REMOVE_ALERT,
    })
}