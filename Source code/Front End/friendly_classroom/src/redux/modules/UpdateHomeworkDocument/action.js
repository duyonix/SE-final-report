import axios from "axios";
import { pathAPI } from "../../../utils/constants";
import * as actionTypes from "./constants";

// action Update Homework 
export const updateHomework = (data) => {
    let accessToken = "";
    if (localStorage.getItem("User"))
        accessToken = JSON.parse(localStorage.getItem("User")).token;

    return (dispatch) => {
        dispatch(updateHomeworkRequest());
        axios({
            url: pathAPI + "homework/changeHomework",
            method: "POST",
            headers: {
                "Authorization": "Bearer " + accessToken
            },
            data: data
        })
            .then(res => {
                // alert("Cập nhật bài tập thành công");
                dispatch(updateHomeworkSuccess(res.data));
            })
            .catch(err => {
                // alert(err.response.data.message);
                dispatch(updateHomeworkFailed(err));
            }
            )
    }
}

export const resetUpdateHomework = () => {
    return (dispatch) => {
        dispatch(updateHomeworkReset());
    }
}

const updateHomeworkRequest = () => {
    return {
        type: actionTypes.UPDATE_HOMEWORK_REQUEST
    }
}

const updateHomeworkSuccess = (data) => {
    return {
        type: actionTypes.UPDATE_HOMEWORK_SUCCESS,
        payload: data
    }
}

const updateHomeworkFailed = (err) => {
    return {
        type: actionTypes.UPDATE_HOMEWORK_FAILED,
        payload: err
    }
}

const updateHomeworkReset = () => {
    return {
        type: actionTypes.UPDATE_HOMEWORK_RESET
    }
}


// action Update Homework File 
export const updateHomeworkFile = (data) => {
    let accessToken = "";
    if (localStorage.getItem("User"))
        accessToken = JSON.parse(localStorage.getItem("User")).token;

    return (dispatch) => {
        dispatch(updateHomeworkFileRequest());
        axios({
            url: pathAPI + "homework/changeHomeworkFile",
            method: "POST",
            headers: {
                "Authorization": "Bearer " + accessToken
            },
            data: data
        })
            .then(res => {
                // alert("Cập nhật file bài tập thành công");
                dispatch(updateHomeworkFileSuccess(res.data));
            })
            .catch(err => {
                // alert(err.response.data.message);
                dispatch(updateHomeworkFileFailed(err));
            }
            )
    }
}

export const resetUpdateHomeworkFile = () => {
    return (dispatch) => {
        dispatch(updateHomeworkFileReset());
    }
}

const updateHomeworkFileRequest = () => {
    return {
        type: actionTypes.UPDATE_HOMEWORK_FILE_REQUEST
    }
}

const updateHomeworkFileSuccess = (data) => {
    return {
        type: actionTypes.UPDATE_HOMEWORK_FILE_SUCCESS,
        payload: data
    }
}

const updateHomeworkFileFailed = (err) => {
    return {
        type: actionTypes.UPDATE_HOMEWORK_FILE_FAILED,
        payload: err
    }
}

const updateHomeworkFileReset = () => {
    return {
        type: actionTypes.UPDATE_HOMEWORK_FILE_RESET
    }
}


// action Update Document 
export const updateDocument = (data) => {
    let accessToken = "";
    if (localStorage.getItem("User"))
        accessToken = JSON.parse(localStorage.getItem("User")).token;

    return (dispatch) => {
        dispatch(updateDocumentRequest());
        axios({
            url: pathAPI + "document/changeDocument",
            method: "POST",
            headers: {
                "Authorization": "Bearer " + accessToken
            },
            data: data
        })
            .then(res => {
                // alert("Cập nhật tài liệu thành công");
                dispatch(updateDocumentSuccess(res.data));
            })
            .catch(err => {
                // alert(err.response.data.message);
                dispatch(updateDocumentFailed(err));
            }
            )
    }
}

export const resetUpdateDocument = () => {
    return (dispatch) => {
        dispatch(updateDocumentReset());
    }
}

const updateDocumentRequest = () => {
    return {
        type: actionTypes.UPDATE_DOCUMENT_REQUEST
    }
}

const updateDocumentSuccess = (data) => {
    return {
        type: actionTypes.UPDATE_DOCUMENT_SUCCESS,
        payload: data
    }
}

const updateDocumentFailed = (err) => {
    return {
        type: actionTypes.UPDATE_DOCUMENT_FAILED,
        payload: err
    }
}

const updateDocumentReset = () => {
    return {
        type: actionTypes.UPDATE_DOCUMENT_RESET
    }
}


// action Update Document File 
export const updateDocumentFile = (data) => {
    let accessToken = "";
    if (localStorage.getItem("User"))
        accessToken = JSON.parse(localStorage.getItem("User")).token;

    return (dispatch) => {
        dispatch(updateDocumentFileRequest());
        axios({
            url: pathAPI + "document/changeDocumentFile",
            method: "POST",
            headers: {
                "Authorization": "Bearer " + accessToken
            },
            data: data
        })
            .then(res => {
                // alert("Cập nhật file tài liệu thành công");
                dispatch(updateDocumentFileSuccess(res.data));
            })
            .catch(err => {
                // alert(err.response.data.message);
                dispatch(updateDocumentFileFailed(err));
            }
            )
    }
}

export const resetUpdateDocumentFile = () => {
    return (dispatch) => {
        dispatch(updateDocumentFileReset());
    }
}

const updateDocumentFileRequest = () => {
    return {
        type: actionTypes.UPDATE_DOCUMENT_FILE_REQUEST
    }
}

const updateDocumentFileSuccess = (data) => {
    return {
        type: actionTypes.UPDATE_DOCUMENT_FILE_SUCCESS,
        payload: data
    }
}

const updateDocumentFileFailed = (err) => {
    return {
        type: actionTypes.UPDATE_DOCUMENT_FILE_FAILED,
        payload: err
    }
}

const updateDocumentFileReset = () => {
    return {
        type: actionTypes.UPDATE_DOCUMENT_FILE_RESET
    }
}