import { ThunkDispatch } from "redux-thunk";
import State from "../types/State";
import { setToast } from "../actions/toast";
import { Toast } from "../types/Toast";

interface Msg {
    msg: string
}

export default function setToastFromRes(msgs: Msg[], dispatcher: ThunkDispatch<State, undefined, any>) {
    if (msgs.length > 0) msgs.forEach((msg: Msg) => dispatcher(setToast(new Toast({
        autoHide: false,
        bg: 'success',
        body: msg.msg,
        dispatcher: dispatcher
    }))));
}