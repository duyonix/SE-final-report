import axios from "axios";
import { pathAPI } from "../../../utils/constants";
import * as actionTypes from "./constants";

export const actFetchSubmission = (homeworkId, studentId) => {

    let accessToken = "";
    if (localStorage.getItem("User"))
        accessToken = JSON.parse(localStorage.getItem("User")).token;
    return (dispatch) => {
        dispatch(actSubmissionRequest());
        axios({
            url: pathAPI + "submission/getSubmission",
            method: "POST",
            data: { homeworkId, studentId },
            headers: {
                "Authorization": "Bearer " + accessToken,

            },
        })
            .then((res) => {

                dispatch(actSubmissionSuccess(res.data));
            })
            .catch((err) => {
                dispatch(actSubmissionFailed(err));
            })
    }
}

export const resetSubmission = () => {
    return (dispatch) => {
        dispatch(actSubmissionReset());
    }
}

export const actSubmissionRequest = () => {
    return {
        type: actionTypes.SUBMISSION_REQUEST,
    }
}

export const actSubmissionReset = () => {
    return {
        type: actionTypes.SUBMISSION_RESET,
    }
}

export const actSubmissionSuccess = (data) => {
    return {
        type: actionTypes.SUBMISSION_SUCCESS,
        payload: data
    }
}
export const actSubmissionFailed = (err) => {
    return {
        type: actionTypes.SUBMISSION_FAILED,
        payload: err
    }
}



export const actDeleteSubmission = (homeworkId) => {

    let accessToken = "";
    if (localStorage.getItem("User"))
        accessToken = JSON.parse(localStorage.getItem("User")).token;
    return (dispatch) => {
        dispatch(actDeleteSubmissionRequest());
        axios({
            url: pathAPI + "submission/deleteSubmission",
            method: "POST",
            data: { homeworkId },
            headers: {
                "Authorization": "Bearer " + accessToken,

            },
        })
            .then((res) => {

                dispatch(actDeleteSubmissionSuccess(res.data));
            })
            .catch((err) => {
                dispatch(actDeleteSubmissionFailed(err));
            })
    }
}


export const actDeleteSubmissionRequest = () => {
    return {
        type: actionTypes.SUBMISSION_DELETE_REQUEST,
    }
}

export const actDeleteSubmissionSuccess = (data) => {
    return {
        type: actionTypes.SUBMISSION_DELETE_SUCCESS,
        payload: data
    }
}
export const actDeleteSubmissionFailed = (err) => {
    return {
        type: actionTypes.SUBMISSION_DELETE_FAILED,
        payload: err
    }
}
export const deleteSubmissionReset = () => {
    return (dispatch) => {
        dispatch(actDeleteSubmissionReset());
    }
}

export const actDeleteSubmissionReset = () => {
    return {
        type: actionTypes.SUBMISSION_DELETE_RESET,
    }
}





export const actSubmitHomework = (userId, file, homeworkId) => {
    let formData = new FormData();
    formData.append("userId", userId);
    formData.append("file", file);
    formData.append("homeworkId", homeworkId);
    let accessToken = "";
    if (localStorage.getItem("User"))
        accessToken = JSON.parse(localStorage.getItem("User")).token;

    return (dispatch) => {
        dispatch(actSubmitHomeworkRequest());
        axios({
            url: pathAPI + "submission/submitSubmission",
            method: "POST",
            data: formData,
            headers: {
                "Authorization": "Bearer " + accessToken,
                "content-type": "multipart/form-data"
            },
        })
            .then((res) => {

                dispatch(actSubmitHomeworkSuccess(res.data));
            })
            .catch((err) => {
                dispatch(actSubmitHomeworkFailed(err));
            })
    }
}

export const resetSubmitHomework = () => {
    return (dispatch) => {
        dispatch(actSubmitHomeworkReset());
    }
}

export const actSubmitHomeworkRequest = () => {
    return {
        type: actionTypes.SUBMIT_HOMEWORK_REQUEST,
    }
}

export const actSubmitHomeworkReset = () => {
    return {
        type: actionTypes.SUBMIT_HOMEWORK_RESET,
    }
}

export const actSubmitHomeworkSuccess = (data) => {
    return {
        type: actionTypes.SUBMIT_HOMEWORK_SUCCESS,
        payload: data
    }
}
export const actSubmitHomeworkFailed = (err) => {
    return {
        type: actionTypes.SUBMIT_HOMEWORK_FAILED,
        payload: err
    }
}