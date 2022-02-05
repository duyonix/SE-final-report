import axios from "axios";
import { pathAPI } from "../../../utils/constants";
import * as actionTypes from "./constants";

// action Fetch All Task
export const fetchAllTodo = () => {
    let accessToken = "";
    if (localStorage.getItem("User"))
        accessToken = JSON.parse(localStorage.getItem("User")).token;

    return (dispatch) => {
        dispatch(fetchAllTodoRequest());
        axios({
            url: pathAPI + "user/todo",
            method: "GET",
            headers: {
                "Authorization": "Bearer " + accessToken
            }
        })
            .then(res => {
                dispatch(fetchAllTodoSuccess(res.data));
            })
            .catch(err => {
                dispatch(fetchAllTodoFailed(err));
            }
            )
    }
}

const fetchAllTodoRequest = () => {
    return {
        type: actionTypes.FETCH_ALL_TODO_REQUEST
    }
}

const fetchAllTodoSuccess = (data) => {
    return {
        type: actionTypes.FETCH_ALL_TODO_SUCCESS,
        payload: data
    }
}

const fetchAllTodoFailed = (err) => {
    return {
        type: actionTypes.FETCH_ALL_TODO_FAILED,
        payload: err
    }
}



