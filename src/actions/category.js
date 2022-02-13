import { 
    GET_CATEGORIES,
    GET_CATEGORIES_FAIL,
} from "./types";
import axios from "axios";

export const getCategories = () => async (dispatch) => {
    try {
        const res = await axios.get('/api/category');

        dispatch({
            type: GET_CATEGORIES,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: GET_CATEGORIES_FAIL,
            payload: {msg: err.res, status: err.response.status}
        });
    }
}