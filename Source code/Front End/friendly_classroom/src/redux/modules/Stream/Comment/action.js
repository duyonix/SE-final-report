import axios from "axios";
import { pathAPI } from "../../../../utils/constants";
import * as actionTypes from "./constants";

//action Fetch all comments

// action Create Comment
export const createComment = (classroomId, postId, data) => {
    let accessToken = "";
    if (localStorage.getItem("User"))
        accessToken = JSON.parse(localStorage.getItem("User")).token;

    return (dispatch) => {
        dispatch(createCommentRequest());
        axios({
            url: pathAPI + `classroom/${classroomId}/post/${postId}/comment`,
            method: "POST",
            headers: {
                "Authorization": "Bearer " + accessToken
            },
            data: data
        })
            .then(res => {
                // alert("Tạo bình luận thành công");
                dispatch(createCommentSuccess(res.data));
            })
            .catch(err => {
                // alert(err.response.data.message);
                dispatch(createCommentFailed(err));
            }
            )
    }
}

export const resetCreateComment = () => {
    return (dispatch) => {
        dispatch(createCommentReset());
    }
}

const createCommentRequest = () => {
    return {
        type: actionTypes.CREATE_COMMENT_REQUEST
    }
}

const createCommentSuccess = (data) => {
    return {
        type: actionTypes.CREATE_COMMENT_SUCCESS,
        payload: data
    }
}

const createCommentFailed = (err) => {
    return {
        type: actionTypes.CREATE_COMMENT_FAILED,
        payload: err
    }
}

const createCommentReset = () => {
    return {
        type: actionTypes.CREATE_COMMENT_RESET
    }
}


// action Update Comment 
export const updateComment = (classroomId, postId, commentId, data) => {
    let accessToken = "";
    if (localStorage.getItem("User"))
        accessToken = JSON.parse(localStorage.getItem("User")).token;

    return (dispatch) => {
        dispatch(updateCommentRequest());
        axios({
            url: pathAPI + `classroom/${classroomId}/post/${postId}/comment/${commentId}`,
            method: "PUT",
            headers: {
                "Authorization": "Bearer " + accessToken
            },
            data: data
        })
            .then(res => {
                // alert("Cập nhật bình luận thành công");
                dispatch(updateCommentSuccess(res.data));
            })
            .catch(err => {
                // alert(err.response.data.message);
                dispatch(updateCommentFailed(err));
            }
            )
    }
}

export const resetUpdateComment = () => {
    return (dispatch) => {
        dispatch(updateCommentReset());
    }
}

const updateCommentRequest = () => {
    return {
        type: actionTypes.UPDATE_COMMENT_REQUEST
    }
}

const updateCommentSuccess = (data) => {
    return {
        type: actionTypes.UPDATE_COMMENT_SUCCESS,
        payload: data
    }
}

const updateCommentFailed = (err) => {
    return {
        type: actionTypes.UPDATE_COMMENT_FAILED,
        payload: err
    }
}

const updateCommentReset = () => {
    return {
        type: actionTypes.UPDATE_COMMENT_RESET
    }
}


// action Delete Comment 
export const deleteComment = (classroomId, postId, commentId) => {
    let accessToken = "";
    if (localStorage.getItem("User"))
        accessToken = JSON.parse(localStorage.getItem("User")).token;

    return (dispatch) => {
        dispatch(deleteCommentRequest());
        axios({
            url: pathAPI + `classroom/${classroomId}/post/${postId}/comment/${commentId}`,
            method: "DELETE",
            headers: {
                "Authorization": "Bearer " + accessToken
            },
        })
            .then(res => {
                // alert("Xóa bình luận thành công");
                dispatch(deleteCommentSuccess(res.data));
            })
            .catch(err => {
                // alert(err.response.data.message);
                dispatch(deleteCommentFailed(err));
            }
            )
    }
}

export const resetDeleteComment = () => {
    return (dispatch) => {
        dispatch(deleteCommentReset());
    }
}

const deleteCommentRequest = () => {
    return {
        type: actionTypes.DELETE_COMMENT_REQUEST
    }
}

const deleteCommentSuccess = (data) => {
    return {
        type: actionTypes.DELETE_COMMENT_SUCCESS,
        payload: data
    }
}

const deleteCommentFailed = (err) => {
    return {
        type: actionTypes.DELETE_COMMENT_FAILED,
        payload: err
    }
}

const deleteCommentReset = () => {
    return {
        type: actionTypes.DELETE_COMMENT_RESET
    }
}