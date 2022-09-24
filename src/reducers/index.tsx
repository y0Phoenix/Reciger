import { combineReducers } from "redux";
import alert from "./alert";
// category functionality not implemented
// import category from "./category";
import user from "./user";
import ingredient from "./ingredient";
import recipe from "./recipe";
import loading from "./loading";

export default combineReducers({
    alert,
    // category,
    user,
    ingredient,
    recipe,
    loading
});