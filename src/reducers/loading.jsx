import { 
    LOADING,
    STOP_LOADING
} from "../actions/types";

// eslint-disable-next-line import/no-anonymous-default-export
export default function(state = {bool: false}, action) {
    const {type} = action;
    switch (type) {
        case LOADING:
            state = {bool: true}
            return state;
        case STOP_LOADING:
            state = {bool: false};
            return state;
        default:
            return state;
    }
}