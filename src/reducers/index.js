import { combineReducers } from "redux";
import alert from "./alert";
import category from "./category";
import user from "./user";
import ingredient from "./ingredient";
import recipe from "./recipe";

export default combineReducers({
    alert,
    category,
    user,
    ingredient,
    recipe
});