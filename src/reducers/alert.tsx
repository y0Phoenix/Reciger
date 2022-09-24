import {
    SET_ALERT,
    REMOVE_ALERT
} from '../actions/types';
import { AlertAction, Alert } from '../types/Alert';
const initialState: Alert[] = [];

// eslint-disable-next-line import/no-anonymous-default-export
export default function(state = initialState, action: AlertAction) {
    const { type, payload } = action;
    switch (type) {
        case SET_ALERT:
            return [...state, payload];
        case REMOVE_ALERT:
            return state = [];
        default:
        return state;
    }
}
