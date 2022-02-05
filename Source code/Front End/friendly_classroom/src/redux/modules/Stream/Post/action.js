import axios from "axios";
import { pathAPI } from "../../../../utils/constants";
import * as actionTypes from "./constants";

// action Fetch All Post
export const fetchAllPost = (classroomId) => {
    let accessToken = "";
    if (localStorage.getItem("User"))
        accessToken = JSON.parse(localStorage.getItem("User")).token;

    return (dispatch) => {
        dispatch(fetchAllPostRequest());
        axios({
            url: pathAPI + `classroom/${classroomId}/post/all`,
            method: "GET",
            headers: {
                "Authorization": "Bearer " + accessToken
            }
        })
            .then(res => {
                dispatch(fetchAllPostSuccess(res.data));
            })
            .catch(err => {
                // console.log(err.response.data);
                dispatch(fetchAllPostFailed(err));
            }
            )
    }
}

const fetchAllPostRequest = () => {
    return {
        type: actionTypes.FETCH_ALL_POST_REQUEST
    }
}

const fetchAllPostSuccess = (data) => {
    return {
        type: actionTypes.FETCH_ALL_POST_SUCCESS,
        payload: data
    }
}

const fetchAllPostFailed = (err) => {
    return {
        type: actionTypes.FETCH_ALL_POST_FAILED,
        payload: err
    }
}


// action Fetch 1 Post
export const fetchSinglePost = (classroomId, postId) => {
    let accessToken = "";
    if (localStorage.getItem("User"))
        accessToken = JSON.parse(localStorage.getItem("User")).token;

    return (dispatch) => {
        dispatch(fetchSinglePostRequest());
        axios({
            url: pathAPI + `classroom/${classroomId}/post/${postId}`,
            method: "GET",
            headers: {
                "Authorization": "Bearer " + accessToken
            }
        })
            .then(res => {
                dispatch(fetchSinglePostSuccess(res.data));
            })
            .catch(err => {
                // console.log(err.response.data);
                dispatch(fetchSinglePostFailed(err));
            }
            )
    }
}

const fetchSinglePostRequest = () => {
    return {
        type: actionTypes.FETCH_SINGLE_POST_REQUEST
    }
}

const fetchSinglePostSuccess = (data) => {
    return {
        type: actionTypes.FETCH_SINGLE_POST_SUCCESS,
        payload: data
    }
}

const fetchSinglePostFailed = (err) => {
    return {
        type: actionTypes.FETCH_SINGLE_POST_FAILED,
        payload: err
    }
}


// action Create Post
export const createPost = (classroomId, data) => {
    let accessToken = "";
    if (localStorage.getItem("User"))
        accessToken = JSON.parse(localStorage.getItem("User")).token;

    return (dispatch) => {
        dispatch(createPostRequest());
        axios({
            url: pathAPI + `classroom/${classroomId}/post`,
            method: "POST",
            headers: {
                "Authorization": "Bearer " + accessToken
            },
            data: data
        })
            .then(res => {
                // alert("Tạo bài đăng thành công");
                dispatch(createPostSuccess(res.data));
            })
            .catch(err => {
                // alert(err.response.data.message);
                dispatch(createPostFailed(err));
            }
            )
    }
}

export const resetCreatePost = () => {
    return (dispatch) => {
        dispatch(createPostReset());
    }
}

const createPostRequest = () => {
    return {
        type: actionTypes.CREATE_POST_REQUEST
    }
}

const createPostSuccess = (data) => {
    return {
        type: actionTypes.CREATE_POST_SUCCESS,
        payload: data
    }
}

const createPostFailed = (err) => {
    return {
        type: actionTypes.CREATE_POST_FAILED,
        payload: err
    }
}

const createPostReset = () => {
    return {
        type: actionTypes.CREATE_POST_RESET
    }
}


// action Update Post 
export const updatePost = (classroomId, postId, data) => {
    let accessToken = "";
    if (localStorage.getItem("User"))
        accessToken = JSON.parse(localStorage.getItem("User")).token;

    return (dispatch) => {
        dispatch(updatePostRequest());
        axios({
            url: pathAPI + `classroom/${classroomId}/post/${postId}`,
            method: "PUT",
            headers: {
                "Authorization": "Bearer " + accessToken
            },
            data: data
        })
            .then(res => {
                // alert("Cập nhật bài đăng thành công");
                dispatch(updatePostSuccess(res.data));
            })
            .catch(err => {
                // alert(err.response.data.message);
                dispatch(updatePostFailed(err));
            }
            )
    }
}

export const resetUpdatePost = () => {
    return (dispatch) => {
        dispatch(updatePostReset());
    }
}

const updatePostRequest = () => {
    return {
        type: actionTypes.UPDATE_POST_REQUEST
    }
}

const updatePostSuccess = (data) => {
    return {
        type: actionTypes.UPDATE_POST_SUCCESS,
        payload: data
    }
}

const updatePostFailed = (err) => {
    return {
        type: actionTypes.UPDATE_POST_FAILED,
        payload: err
    }
}

const updatePostReset = () => {
    return {
        type: actionTypes.UPDATE_POST_RESET
    }
}


// action Delete Post 
export const deletePost = (classroomId, postId) => {
    let accessToken = "";
    if (localStorage.getItem("User"))
        accessToken = JSON.parse(localStorage.getItem("User")).token;

    return (dispatch) => {
        dispatch(deletePostRequest());
        axios({
            url: pathAPI + `classroom/${classroomId}/post/${postId}`,
            method: "DELETE",
            headers: {
                "Authorization": "Bearer " + accessToken
            },
        })
            .then(res => {
                // alert("Xóa bài đăng thành công");
                dispatch(deletePostSuccess(res.data));
            })
            .catch(err => {
                // alert(err.response.data.message);
                dispatch(deletePostFailed(err));
            }
            )
    }
}

export const resetDeletePost = () => {
    return (dispatch) => {
        dispatch(deletePostReset());
    }
}

const deletePostRequest = () => {
    return {
        type: actionTypes.DELETE_POST_REQUEST
    }
}

const deletePostSuccess = (data) => {
    return {
        type: actionTypes.DELETE_POST_SUCCESS,
        payload: data
    }
}

const deletePostFailed = (err) => {
    return {
        type: actionTypes.DELETE_POST_FAILED,
        payload: err
    }
}

const deletePostReset = () => {
    return {
        type: actionTypes.DELETE_POST_RESET
    }
}