import axios from "axios";
import { pathAPI } from "../../../utils/constants";
import * as actionTypes from "./constants";

// action Fetch All Task
export const fetchAllCalendar = (classroomId) => {
    let accessToken = "";
    if (localStorage.getItem("User"))
        accessToken = JSON.parse(localStorage.getItem("User")).token;

    return (dispatch) => {
        dispatch(fetchAllCalendarRequest());
        axios({
            url: pathAPI + "user/calendar",
            method: "GET",
            headers: {
                "Authorization": "Bearer " + accessToken
            }
        })
            .then(res => {
                dispatch(fetchAllCalendarSuccess(res.data));
            })
            .catch(err => {
                dispatch(fetchAllCalendarFailed(err));
            }
            )
    }
}

const fetchAllCalendarRequest = () => {
    return {
        type: actionTypes.FETCH_ALL_CALENDAR_REQUEST
    }
}

const fetchAllCalendarSuccess = (data) => {
    return {
        type: actionTypes.FETCH_ALL_CALENDAR_SUCCESS,
        payload: data
    }
}

const fetchAllCalendarFailed = (err) => {
    return {
        type: actionTypes.FETCH_ALL_CALENDAR_FAILED,
        payload: err
    }
}

export const fetchAllCalendarReset = (err) => {
    return {
        type: actionTypes.FETCH_ALL_CALENDAR_RESET,
    }
}

 


