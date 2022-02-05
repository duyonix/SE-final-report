import axios from "axios";
import { pathAPI } from "../../../utils/constants";
import * as actionTypes from "./constants";

// action Fetch All Task
export const changeAvatar = (avatar) => {
    let accessToken = "";
    if (localStorage.getItem("User"))
        accessToken = JSON.parse(localStorage.getItem("User")).token;
    let formData = new FormData();
    formData.append("avatar", avatar);

    return (dispatch) => {
        dispatch(changeAvatarRequest());
        axios({
            url: pathAPI + `user/changeAvatar`,
            method: "POST",
            data: formData,
            headers: {
                "Authorization": "Bearer " + accessToken
            }
        })
            .then(res => {
                dispatch(changeAvatarSuccess(res.data));
            })
            .catch(err => {
                dispatch(changeAvatarFailed(err));
            })
    }
}
export const resetAvatar = () => {
    return (dispatch) => {
        dispatch(changeAvatarReset());
    }
}
const changeAvatarRequest = () => {
    return {
        type: actionTypes.CHANGE_AVATAR_REQUEST
    }
}

const changeAvatarSuccess = (data) => {
    return {
        type: actionTypes.CHANGE_AVATAR_SUCCESS,
        payload: data
    }
}

const changeAvatarFailed = (err) => {
    return {
        type: actionTypes.CHANGE_AVATAR_FAILED,
        payload: err
    }
}

const changeAvatarReset = () => {
    return {
        type: actionTypes.CHANGE_AVATAR_RESET,
    }
}


