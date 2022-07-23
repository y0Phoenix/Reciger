import { LOADING, STOP_LOADING } from "./types"

export const loading = () => dispatch =>{
    dispatch({
        type: LOADING
    });
}

export const stopLoading = () => dispatch =>{
    dispatch({
        type: STOP_LOADING
    });
}
