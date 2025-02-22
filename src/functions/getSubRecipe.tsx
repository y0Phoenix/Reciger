import axios from "axios";
import { NavigateFunction } from "react-router-dom";

export default async function getSubRecipe(name: string, navigate: NavigateFunction) {
    try {
        const res = await axios.get(`/api/ingredient?all=true&recipe=true&name=${name}`);
        navigate(`/recipe/${res.data.data._id}`);
    } catch (error: any) {
        return null;
    }
}