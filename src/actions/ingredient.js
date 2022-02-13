import { 
    GET_INGREDIENTS,
    GET_INGREDIENTS_FAIL,
} from "./types";
import axios from "axios";

export const getIngredients = (all = false)  => async (dispatch) => {
    try {
        const res = await axios.get(`/api/ingredient?all=${all}`);

        dispatch({
            type: GET_INGREDIENTS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: GET_INGREDIENTS_FAIL,
            payload: {msg: err.res, status: err.response.status}
        });
    }
}