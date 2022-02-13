import { 
    GET_RECIPES,
    GET_RECIPES_FAIL,
} from "./types";
import axios from "axios";

// get recipes with all as the query for recieving all the recipe data or just the id, name, categories, user
export const getRecipes = (all = false) => async (dispatch) => {
    try {
        const res = await axios.get(`/api/recipe?all=${all}`);

        dispatch({
            type: GET_RECIPES,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: GET_RECIPES_FAIL,
            payload: {msg: err.res, status: err.response.status}
        });
    }
}