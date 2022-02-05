import axios from "axios";
import { pathAPI } from "../../../utils/constants";
import * as actionTypes from "./constants";

export const loginUser = (user) => {
    return (dispatch) => {
        dispatch(actLoginRequest());
        axios({
            url: pathAPI + "authorize/login",
            method: "POST",
            data: user,
        })
            .then((res) => {
                // alert("Đăng nhập thành công");
                localStorage.setItem("User", JSON.stringify(res.data));
                dispatch(actLoginSuccess(res.data));
            })
            .catch((err) => {
                dispatch(actLoginFailed(err));
            })
    }
}

export const resetLogin = () => {
    return (dispatch) => {
        dispatch(actLoginReset());
    }
}

export const actLoginRequest = () => {
    return {
        type: actionTypes.LOGIN_REQUEST,
    }
}

export const actLoginReset = () => {
    return {
        type: actionTypes.LOGIN_RESET,
    }
}

export const actLoginSuccess = (data) => {
    return {
        type: actionTypes.LOGIN_SUCCESS,
        payload: data
    }
}
export const actLoginFailed = (err) => {
    return {
        type: actionTypes.LOGIN_FAILED,
        payload: err
    }
}
