import { ThunkDispatch } from "redux-thunk";
import State from "../types/State";
import { setToast } from "../actions/toast";
import { Toast } from "../types/Toast";

export default function setToastFromRes(toasts: Toast[], dispatcher: ThunkDispatch<State, undefined, any>) {
    if (toasts.length > 0) toasts.forEach((toast: Toast) => dispatcher(setToast(new Toast({
        autoHide: toast.autoHide,
        bg: toast.bg,
        body: toast.body,
        dispatcher: dispatcher
    }))));
}