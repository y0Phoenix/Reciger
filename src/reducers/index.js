import { combineReducers } from "redux";
import alert from "./alert";
import category from "./category";
import auth from "./auth";
import ingredient from "./ingredient";
import recipe from "./recipe";

export default combineReducers({
    alert,
    category,
    auth,
    ingredient,
    recipe
});