import { 
    SET_ALERT,
    REMOVE_ALERT
} from "./types";
import {v4 as uuid} from 'uuid';

export const setAlert = (msg, type, setShowModal) => dispatch => {
    const id = uuid();
    setShowModal(true);
    dispatch({
        type: SET_ALERT,
        payload: {msg, type, id}
    });
};

export const removeAlert = () => dispatch => {
    dispatch({
        type: REMOVE_ALERT,
    })
}