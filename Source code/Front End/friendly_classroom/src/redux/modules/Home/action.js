import axios from "axios";
import { pathAPI } from "../../../utils/constants";
import * as actionTypes from "./constants";

// action Fetch User Info
export const fetchUserInfo = () => {
    let accessToken = "";
    if (localStorage.getItem("User"))
        accessToken = JSON.parse(localStorage.getItem("User")).token;

    // console.log("accessToken", accessToken);

    return (dispatch) => {
        dispatch(fetchUserInfoRequest());
        axios({
            url: pathAPI + "user/getInformation",
            method: "GET",
            headers: {
                "Authorization": "Bearer " + accessToken
            }
        })
            .then(res => {
                dispatch(fetchUserInfoSuccess(res.data));
            })
            .catch(err => {
                // console.log(err.response.data);
                dispatch(fetchUserInfoFailed(err));
            }
            )
    }
}

const fetchUserInfoRequest = () => {
    return {
        type: actionTypes.FETCH_USER_INFO_REQUEST
    }
}

const fetchUserInfoSuccess = (data) => {
    return {
        type: actionTypes.FETCH_USER_INFO_SUCCESS,
        payload: data
    }
}

const fetchUserInfoFailed = (err) => {
    return {
        type: actionTypes.FETCH_USER_INFO_FAILED,
        payload: err
    }
}


// action Create Classroom
export const createClassroom = (data) => {
    let accessToken = "";
    if (localStorage.getItem("User"))
        accessToken = JSON.parse(localStorage.getItem("User")).token;

    return (dispatch) => {
        dispatch(createClassroomRequest());
        axios({
            url: pathAPI + "classroom/create",
            method: "POST",
            headers: {
                "Authorization": "Bearer " + accessToken
            },
            data: data
        })
            .then(res => {
                // alert("Tạo lớp học thành công");
                dispatch(createClassroomSuccess(res.data));
            })
            .catch(err => {
                // alert(err.response.data.message);
                dispatch(createClassroomFailed(err));
            }
            )
    }
}

export const resetCreateClassroom = () => {
    return (dispatch) => {
        dispatch(createClassroomReset());
    }
}

const createClassroomRequest = () => {
    return {
        type: actionTypes.CREATE_CLASSROOM_REQUEST
    }
}

const createClassroomSuccess = (data) => {
    return {
        type: actionTypes.CREATE_CLASSROOM_SUCCESS,
        payload: data
    }
}

const createClassroomFailed = (err) => {
    return {
        type: actionTypes.CREATE_CLASSROOM_FAILED,
        payload: err
    }
}

const createClassroomReset = () => {
    return {
        type: actionTypes.CREATE_CLASSROOM_RESET
    }
}


// action Join Classroom
export const joinClassroom = (data) => {
    let accessToken = "";
    if (localStorage.getItem("User"))
        accessToken = JSON.parse(localStorage.getItem("User")).token;

    return (dispatch) => {
        dispatch(joinClassroomRequest());
        axios({
            url: pathAPI + "classroom/join",
            method: "PUT",
            headers: {
                "Authorization": "Bearer " + accessToken
            },
            data: data
        })
            .then(res => {
                // alert("Tham gia lớp học thành công");
                dispatch(joinClassroomSuccess(res.data));
            })
            .catch(err => {
                // alert(err.response.data.message);
                dispatch(joinClassroomFailed(err));
            }
            )
    }
}

export const resetJoinClassroom = () => {
    return (dispatch) => {
        dispatch(joinClassroomReset());
    }
}


const joinClassroomRequest = () => {
    return {
        type: actionTypes.JOIN_CLASSROOM_REQUEST
    }
}

const joinClassroomSuccess = (data) => {
    return {
        type: actionTypes.JOIN_CLASSROOM_SUCCESS,
        payload: data
    }
}

const joinClassroomFailed = (err) => {
    return {
        type: actionTypes.JOIN_CLASSROOM_FAILED,
        payload: err
    }
}

const joinClassroomReset = () => {
    return {
        type: actionTypes.JOIN_CLASSROOM_RESET
    }
}

// action Update Classroom 
export const updateClassroom = (classroomId, data) => {
    let accessToken = "";
    if (localStorage.getItem("User"))
        accessToken = JSON.parse(localStorage.getItem("User")).token;

    return (dispatch) => {
        dispatch(updateClassroomRequest());
        axios({
            url: pathAPI + `classroom/${classroomId}`,
            method: "PUT",
            headers: {
                "Authorization": "Bearer " + accessToken
            },
            data: data
        })
            .then(res => {
                // alert("Cập nhật lớp học thành công");
                dispatch(updateClassroomSuccess(res.data));
            })
            .catch(err => {
                // alert(err.response.data.message);
                dispatch(updateClassroomFailed(err));
            }
            )
    }
}

export const resetUpdateClassroom = () => {
    return (dispatch) => {
        dispatch(updateClassroomReset());
    }
}

const updateClassroomRequest = () => {
    return {
        type: actionTypes.UPDATE_CLASSROOM_REQUEST
    }
}

const updateClassroomSuccess = (data) => {
    return {
        type: actionTypes.UPDATE_CLASSROOM_SUCCESS,
        payload: data
    }
}

const updateClassroomFailed = (err) => {
    return {
        type: actionTypes.UPDATE_CLASSROOM_FAILED,
        payload: err
    }
}

const updateClassroomReset = () => {
    return {
        type: actionTypes.UPDATE_CLASSROOM_RESET
    }
}


// action Delete Classroom 
export const deleteClassroom = (classroomId) => {
    let accessToken = "";
    if (localStorage.getItem("User"))
        accessToken = JSON.parse(localStorage.getItem("User")).token;

    return (dispatch) => {
        dispatch(deleteClassroomRequest());
        axios({
            url: pathAPI + `classroom/${classroomId}`,
            method: "DELETE",
            headers: {
                "Authorization": "Bearer " + accessToken
            },
        })
            .then(res => {
                // alert("Xóa lớp học thành công");
                dispatch(deleteClassroomSuccess(res.data));
            })
            .catch(err => {
                // alert(err.response.data.message);
                dispatch(deleteClassroomFailed(err));
            }
            )
    }
}

export const resetDeleteClassroom = () => {
    return (dispatch) => {
        dispatch(deleteClassroomReset());
    }
}

const deleteClassroomRequest = () => {
    return {
        type: actionTypes.DELETE_CLASSROOM_REQUEST
    }
}

const deleteClassroomSuccess = (data) => {
    return {
        type: actionTypes.DELETE_CLASSROOM_SUCCESS,
        payload: data
    }
}

const deleteClassroomFailed = (err) => {
    return {
        type: actionTypes.DELETE_CLASSROOM_FAILED,
        payload: err
    }
}

const deleteClassroomReset = () => {
    return {
        type: actionTypes.DELETE_CLASSROOM_RESET
    }
}


// action Leave Classroom 
export const leaveClassroom = (classroomId) => {
    let accessToken = "";
    if (localStorage.getItem("User"))
        accessToken = JSON.parse(localStorage.getItem("User")).token;

    return (dispatch) => {
        dispatch(leaveClassroomRequest());
        axios({
            url: pathAPI + `classroom/${classroomId}/leaveClassroom`,
            method: "PUT",
            headers: {
                "Authorization": "Bearer " + accessToken
            },
        })
            .then(res => {
                // alert("Rời lớp học thành công");
                dispatch(leaveClassroomSuccess(res.data));
            })
            .catch(err => {
                // alert(err.response.data.message);
                dispatch(leaveClassroomFailed(err));
            }
            )
    }
}

export const resetLeaveClassroom = () => {
    return (dispatch) => {
        dispatch(leaveClassroomReset());
    }
}

const leaveClassroomRequest = () => {
    return {
        type: actionTypes.LEAVE_CLASSROOM_REQUEST
    }
}

const leaveClassroomSuccess = (data) => {
    return {
        type: actionTypes.LEAVE_CLASSROOM_SUCCESS,
        payload: data
    }
}

const leaveClassroomFailed = (err) => {
    return {
        type: actionTypes.LEAVE_CLASSROOM_FAILED,
        payload: err
    }
}

const leaveClassroomReset = () => {
    return {
        type: actionTypes.LEAVE_CLASSROOM_RESET
    }
}

