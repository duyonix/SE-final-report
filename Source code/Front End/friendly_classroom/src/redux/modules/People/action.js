import axios from "axios";
import { pathAPI } from "../../../utils/constants";
import * as actionTypes from "./constants";

export const actFetchPeopleList = (classroomId) => {
    let accessToken = "";
    if (localStorage.getItem("User"))
        accessToken = JSON.parse(localStorage.getItem("User")).token;

    return (dispatch) => {
        dispatch(actPeopleRequest());
        axios({
            url: pathAPI + `classroom/${classroomId}/people`,
            method: "GET",
            headers: {
                "Authorization": "Bearer " + accessToken
            },
        })
            .then((res) => {
                dispatch(actPeopleSuccess(res.data));
            })
            .catch((err) => {
                dispatch(actPeopleFailed(err));
            })
    }
}

export const resetPeople = () => {
    return (dispatch) => {
        dispatch(actPeopleReset());
    }
}

export const actPeopleRequest = () => {
    return {
        type: actionTypes.PEOPLE_REQUEST,
    }
}

export const actPeopleReset = () => {
    return {
        type: actionTypes.PEOPLE_RESET,
    }
}

export const actPeopleSuccess = (data) => {
    return {
        type: actionTypes.PEOPLE_SUCCESS,
        payload: data
    }
}
export const actPeopleFailed = (err) => {
    return {
        type: actionTypes.PEOPLE_FAILED,
        payload: err
    }
}
export const actPeopleChange = () => {
    return {
        type: actionTypes.PEOPLE_CHANGE,
    }
}
export const actPeopleSearch = (key) => {
    return {
        type: actionTypes.PEOPLE_SEARCH,
        payload: key,
    }

}
export const actPeopleSearchReset = () => {
    return {
        type: actionTypes.PEOPLE_SEARCH_RESET,
    }
}

export const actInviteStudent = (classroomId, username) => {
    let accessToken = "";
    if (localStorage.getItem("User"))
        accessToken = JSON.parse(localStorage.getItem("User")).token;

    return (dispatch) => {
        dispatch(actInviteStudentRequest());
        axios({
            url: pathAPI + "classroom/" + classroomId + "/inviteStudent",
            method: "PUT",
            data: { username: username },
            headers: {
                "Authorization": "Bearer " + accessToken
            },
        })
            .then((res) => {

                dispatch(actInviteStudentSuccess(res.data));
            })
            .catch((err) => {
                dispatch(actInviteStudentFailed(err));
            })
    }
}

export const resetInviteStudent = () => {
    return (dispatch) => {
        dispatch(actInviteStudentReset());
    }
}
export const actInviteStudentRequest = () => {
    return {
        type: actionTypes.INVITE_STUDENT_REQUEST,
    }
}
export const actInviteStudentSuccess = (data) => {
    return {
        type: actionTypes.INVITE_STUDENT_SUCCESS,
        payload: data
    }
}
export const actInviteStudentFailed = (err) => {
    return {
        type: actionTypes.INVITE_STUDENT_FAILED,
        payload: err
    }
}
export const actInviteStudentReset = () => {
    return {
        type: actionTypes.INVITE_STUDENT_RESET,
    }
}


export const actDeleteStudent = (classroomId, idStudent) => {
    let accessToken = "";
    if (localStorage.getItem("User"))
        accessToken = JSON.parse(localStorage.getItem("User")).token;
    console.log(idStudent);
    return (dispatch) => {
        dispatch(actDeleteStudentRequest());
        axios({
            url: pathAPI + "classroom/" + classroomId + "/removeStudent",
            method: "PUT",
            data: { studentId: idStudent },
            headers: {
                "Authorization": "Bearer " + accessToken
            },
        })
            .then((res) => {

                dispatch(actDeleteStudentSuccess(res.data));
            })
            .catch((err) => {
                dispatch(actDeleteStudentFailed(err));
            })
    }
}
export const resetDeleteStudent = () => {
    return (dispatch) => {
        dispatch(actDeleteStudentReset());
    }
}

export const actDeleteStudentRequest = () => {
    return {
        type: actionTypes.DELETE_STUDENT_REQUEST,
    }
}

export const actDeleteStudentSuccess = (data) => {
    return {
        type: actionTypes.DELETE_STUDENT_SUCCESS,
        payload: data
    }
}
export const actDeleteStudentFailed = (err) => {
    return {
        type: actionTypes.DELETE_STUDENT_FAILED,
        payload: err
    }
}
export const actDeleteStudentReset = () => {
    return {
        type: actionTypes.DELETE_STUDENT_RESET,
    }
}
