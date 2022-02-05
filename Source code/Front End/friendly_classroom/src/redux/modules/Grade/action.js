import axios from "axios";
import { pathAPI } from "../../../utils/constants";
import * as actionTypes from "./constants";

// action Fetch All Score Classroom
export const fetchAllScoreClassroom = (classroomId) => {
    let accessToken = "";
    if (localStorage.getItem("User"))
        accessToken = JSON.parse(localStorage.getItem("User")).token;

    return (dispatch) => {
        dispatch(fetchAllScoreClassroomRequest());
        axios({
            url: pathAPI + "submission/getAllScoreOf1Class",
            method: "POST",
            headers: {
                "Authorization": "Bearer " + accessToken
            },
            data: { classroomId },
        })
            .then(res => {
                dispatch(fetchAllScoreClassroomSuccess(res.data));
            })
            .catch(err => {
                // console.log(err.response.data);
                dispatch(fetchAllScoreClassroomFailed(err));
            }
            )
    }
}

const fetchAllScoreClassroomRequest = () => {
    return {
        type: actionTypes.FETCH_ALL_SCORE_CLASSROOM_REQUEST
    }
}

const fetchAllScoreClassroomSuccess = (data) => {
    return {
        type: actionTypes.FETCH_ALL_SCORE_CLASSROOM_SUCCESS,
        payload: data
    }
}

const fetchAllScoreClassroomFailed = (err) => {
    return {
        type: actionTypes.FETCH_ALL_SCORE_CLASSROOM_FAILED,
        payload: err
    }
}


// action Fetch All Score User
export const fetchAllScoreUser = (classroomId) => {
    let accessToken = "";
    if (localStorage.getItem("User"))
        accessToken = JSON.parse(localStorage.getItem("User")).token;

    return (dispatch) => {
        dispatch(fetchAllScoreUserRequest());
        axios({
            url: pathAPI + "user/getAllScore",
            method: "POST",
            headers: {
                "Authorization": "Bearer " + accessToken
            },
            data: { classroomId },
        })
            .then(res => {
                dispatch(fetchAllScoreUserSuccess(res.data));
            })
            .catch(err => {
                // console.log(err.response.data);
                dispatch(fetchAllScoreUserFailed(err));
            }
            )
    }
}

const fetchAllScoreUserRequest = () => {
    return {
        type: actionTypes.FETCH_ALL_SCORE_USER_REQUEST
    }
}

const fetchAllScoreUserSuccess = (data) => {
    return {
        type: actionTypes.FETCH_ALL_SCORE_USER_SUCCESS,
        payload: data
    }
}

const fetchAllScoreUserFailed = (err) => {
    return {
        type: actionTypes.FETCH_ALL_SCORE_USER_FAILED,
        payload: err
    }
}