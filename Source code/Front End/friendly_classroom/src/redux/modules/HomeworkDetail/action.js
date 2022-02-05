import axios from "axios";
import { pathAPI } from "../../../utils/constants";
import * as actionTypes from "./constants";

// action Fetch All Submission
export const fetchAllSubmission = (homeworkId) => {
    let accessToken = "";
    if (localStorage.getItem("User"))
        accessToken = JSON.parse(localStorage.getItem("User")).token;

    return (dispatch) => {
        dispatch(fetchAllSubmissionRequest());
        axios({
            url: pathAPI + "submission/getAllSubmissionMetadataOfHomework",
            method: "POST",
            headers: {
                "Authorization": "Bearer " + accessToken
            },
            data: { homeworkId: homeworkId },
        })
            .then(res => {
                dispatch(fetchAllSubmissionSuccess(res.data));
            })
            .catch(err => {
                // console.log(err.response.data);
                dispatch(fetchAllSubmissionFailed(err));
            }
            )
    }
}

const fetchAllSubmissionRequest = () => {
    return {
        type: actionTypes.FETCH_ALL_SUBMISSION_REQUEST
    }
}

const fetchAllSubmissionSuccess = (data) => {
    return {
        type: actionTypes.FETCH_ALL_SUBMISSION_SUCCESS,
        payload: data
    }
}

const fetchAllSubmissionFailed = (err) => {
    return {
        type: actionTypes.FETCH_ALL_SUBMISSION_FAILED,
        payload: err
    }
}


// action Add Score
export const addScore = (data) => {
    let accessToken = "";
    if (localStorage.getItem("User"))
        accessToken = JSON.parse(localStorage.getItem("User")).token;

    return (dispatch) => {
        dispatch(addScoreRequest());
        axios({
            url: pathAPI + "submission/addCommentAndScore",
            method: "POST",
            headers: {
                "Authorization": "Bearer " + accessToken
            },
            data: data
        })
            .then(res => {
                // alert("Tạo lớp học thành công");
                dispatch(addScoreSuccess(res.data));
            })
            .catch(err => {
                // alert(err.response.data.message);
                dispatch(addScoreFailed(err));
            }
            )
    }
}

export const resetAddScore = () => {
    return (dispatch) => {
        dispatch(addScoreReset());
    }
}

const addScoreRequest = () => {
    return {
        type: actionTypes.ADD_SCORE_REQUEST
    }
}

const addScoreSuccess = (data) => {
    return {
        type: actionTypes.ADD_SCORE_SUCCESS,
        payload: data
    }
}

const addScoreFailed = (err) => {
    return {
        type: actionTypes.ADD_SCORE_FAILED,
        payload: err
    }
}

const addScoreReset = () => {
    return {
        type: actionTypes.ADD_SCORE_RESET
    }
}