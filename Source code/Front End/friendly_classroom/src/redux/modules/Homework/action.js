import axios from "axios";
import { pathAPI } from "../../../utils/constants";
import * as actionTypes from "./constants";

export const actFetchHomeworkList = (id) => {
    let accessToken = "";
    if (localStorage.getItem("User"))
        accessToken = JSON.parse(localStorage.getItem("User")).token;
    return (dispatch) => {
        dispatch(actHomeworkRequest());
        axios({
            url: pathAPI + "homework/getAllHomeworkMetadataOfClass",
            method: "POST",
            data: { classroomId: id },
            headers: {
                "Authorization": "Bearer " + accessToken
            },
        })
            .then((res) => {

                dispatch(actHomeworkSuccess(res.data));
            })
            .catch((err) => {
                dispatch(actHomeworkFailed(err));
            })
    }
}

export const resetHomework = () => {
    return (dispatch) => {
        dispatch(actHomeworkReset());
    }
}

export const actHomeworkRequest = () => {
    return {
        type: actionTypes.HOMEWORK_REQUEST,
    }
}

export const actHomeworkReset = () => {
    return {
        type: actionTypes.HOMEWORK_RESET,
    }
}

export const actHomeworkSuccess = (data) => {
    return {
        type: actionTypes.HOMEWORK_SUCCESS,
        payload: data
    }
}
export const actHomeworkFailed = (err) => {
    return {
        type: actionTypes.HOMEWORK_FAILED,
        payload: err
    }
}
export const actHomeworkSearch = (key) => {
    return {
        type: actionTypes.HOMEWORK_SEARCH,
        payload: key,
    }

}


export const actFetchHomeworkDetailList = (id) => {
    let accessToken = "";
    if (localStorage.getItem("User"))
        accessToken = JSON.parse(localStorage.getItem("User")).token;
    return (dispatch) => {
        dispatch(actHomeworkDetailRequest());
        axios({
            url: pathAPI + "homework/getHomeworkDetail",
            method: "POST",
            data: { homeworkId: id },
            headers: {
                "Authorization": "Bearer " + accessToken
            },
        })
            .then((res) => {

                dispatch(actHomeworkDetailSuccess(res.data));
            })
            .catch((err) => {
                dispatch(actHomeworkDetailFailed(err));
            })
    }
}

export const resetHomeworkDetail = () => {
    return (dispatch) => {
        dispatch(actHomeworkDetailReset());
    }
}

export const actHomeworkDetailRequest = () => {
    return {
        type: actionTypes.HOMEWORK_DETAIL_REQUEST,
    }
}

export const actHomeworkDetailReset = () => {
    return {
        type: actionTypes.HOMEWORK_DETAIL_RESET,
    }
}

export const actHomeworkDetailSuccess = (data) => {
    return {
        type: actionTypes.HOMEWORK_DETAIL_SUCCESS,
        payload: data
    }
}
export const actHomeworkDetailFailed = (err) => {
    return {
        type: actionTypes.HOMEWORK_DETAIL_FAILED,
        payload: err
    }
}




export const actFetchDocumentList = (id) => {
    let accessToken = "";
    if (localStorage.getItem("User"))
        accessToken = JSON.parse(localStorage.getItem("User")).token;

    return (dispatch) => {
        dispatch(actDocumentRequest());
        axios({
            url: pathAPI + "document/getAllDocumentMetadataOfClass",
            method: "POST",
            data: { classroomId: id },
            headers: {
                "Authorization": "Bearer " + accessToken
            },
        })
            .then((res) => {

                dispatch(actDocumentSuccess(res.data));
            })
            .catch((err) => {
                dispatch(actDocumentFailed(err));
            })
    }
}

export const resetDocument = () => {
    return (dispatch) => {
        dispatch(actDocumentReset());
    }
}

export const actDocumentRequest = () => {
    return {
        type: actionTypes.DOCUMENT_REQUEST,
    }
}

export const actDocumentReset = () => {
    return {
        type: actionTypes.DOCUMENT_RESET,
    }
}

export const actDocumentSuccess = (data) => {
    return {
        type: actionTypes.DOCUMENT_SUCCESS,
        payload: data
    }
}
export const actDocumentFailed = (err) => {
    return {
        type: actionTypes.DOCUMENT_FAILED,
        payload: err
    }
}
export const actDocumentSearch = (key) => {
    return {
        type: actionTypes.DOCUMENT_SEARCH,
        payload: key,
    }

}

export const actFetchDocumentDetailList = (id) => {
    let accessToken = "";
    if (localStorage.getItem("User"))
        accessToken = JSON.parse(localStorage.getItem("User")).token;
    return (dispatch) => {
        dispatch(actDocumentDetailRequest());
        axios({
            url: pathAPI + "document/download",
            method: "POST",
            data: { documentId: id },
            headers: {
                "Authorization": "Bearer " + accessToken
            },
        })
            .then((res) => {

                dispatch(actDocumentDetailSuccess(res.data));
            })
            .catch((err) => {
                dispatch(actDocumentDetailFailed(err));
            })
    }
}

export const resetDocumentDetail = () => {
    return (dispatch) => {
        dispatch(actDocumentDetailReset());
    }
}

export const actDocumentDetailRequest = () => {
    return {
        type: actionTypes.DOCUMENT_DETAIL_REQUEST,
    }
}

export const actDocumentDetailReset = () => {
    return {
        type: actionTypes.DOCUMENT_DETAIL_RESET,
    }
}

export const actDocumentDetailSuccess = (data) => {
    return {
        type: actionTypes.DOCUMENT_DETAIL_SUCCESS,
        payload: data
    }
}
export const actDocumentDetailFailed = (err) => {
    return {
        type: actionTypes.DOCUMENT_DETAIL_FAILED,
        payload: err
    }
}

// action Create Homework
export const createHomework = (data) => {
    let accessToken = "";
    if (localStorage.getItem("User"))
        accessToken = JSON.parse(localStorage.getItem("User")).token;

    return (dispatch) => {
        dispatch(createHomeworkRequest());
        axios({
            url: pathAPI + "homework/createHomework",
            method: "POST",
            headers: {
                "Authorization": "Bearer " + accessToken,
                'Content-Type': 'multipart/form-data'
            },
            data: data
        })
            .then(res => {
                // alert("Tạo bài đăng thành công");
                dispatch(createHomeworkSuccess(res.data));
            })
            .catch(err => {
                // alert(err.response.data.message);
                dispatch(createHomeworkFailed(err));
            }
            )
    }
}

export const resetCreateHomework = () => {
    return (dispatch) => {
        dispatch(createHomeworkReset());
    }
}

const createHomeworkRequest = () => {
    return {
        type: actionTypes.CREATE_HOMEWORK_REQUEST
    }
}

const createHomeworkSuccess = (data) => {
    return {
        type: actionTypes.CREATE_HOMEWORK_SUCCESS,
        payload: data
    }
}

const createHomeworkFailed = (err) => {
    return {
        type: actionTypes.CREATE_HOMEWORK_FAILED,
        payload: err
    }
}

const createHomeworkReset = () => {
    return {
        type: actionTypes.CREATE_HOMEWORK_RESET
    }
}


// action Create Document
export const createDocument = (data) => {
    let accessToken = "";
    if (localStorage.getItem("User"))
        accessToken = JSON.parse(localStorage.getItem("User")).token;

    return (dispatch) => {
        dispatch(createDocumentRequest());
        axios({
            url: pathAPI + "document/upload",
            method: "POST",
            headers: {
                "Authorization": "Bearer " + accessToken,
                'Content-Type': 'multipart/form-data'
            },
            data: data
        })
            .then(res => {
                // alert("Tạo bài đăng thành công");
                dispatch(createDocumentSuccess(res.data));
            })
            .catch(err => {
                // alert(err.response.data.message);
                dispatch(createDocumentFailed(err));
            }
            )
    }
}

export const resetCreateDocument = () => {
    return (dispatch) => {
        dispatch(createDocumentReset());
    }
}

const createDocumentRequest = () => {
    return {
        type: actionTypes.CREATE_DOCUMENT_REQUEST
    }
}

const createDocumentSuccess = (data) => {
    return {
        type: actionTypes.CREATE_DOCUMENT_SUCCESS,
        payload: data
    }
}

const createDocumentFailed = (err) => {
    return {
        type: actionTypes.CREATE_DOCUMENT_FAILED,
        payload: err
    }
}

const createDocumentReset = () => {
    return {
        type: actionTypes.CREATE_DOCUMENT_RESET
    }
}