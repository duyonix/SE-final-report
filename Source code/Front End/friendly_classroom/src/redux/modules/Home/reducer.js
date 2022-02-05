import * as actionTypes from "./constants";


const userInfo = {
    loading: false,
    data: null,
    err: null,

}

export const fetchUserInfoReducer = (state = userInfo, { type, payload }) => {
    switch (type) {
        case actionTypes.FETCH_USER_INFO_REQUEST:
            state.loading = true;
            state.data = null;
            state.err = null;
            return { ...state };
        case actionTypes.FETCH_USER_INFO_SUCCESS:
            state.loading = false;
            state.data = payload;
            state.err = null;
            return { ...state };
        case actionTypes.FETCH_USER_INFO_FAILED:
            state.loading = false;
            state.data = null;
            state.err = payload;
            return { ...state };
        default: return { ...state };
    }
}

// Create Classroom Reducer
const stateCreateClassroom = {
    loading: false,
    data: null,
    err: null
}

export const createClassroomReducer = (state = stateCreateClassroom, { type, payload }) => {
    switch (type) {
        case actionTypes.CREATE_CLASSROOM_REQUEST:
            state.loading = true;
            state.data = null;
            state.err = null;
            return { ...state };
        case actionTypes.CREATE_CLASSROOM_SUCCESS:
            state.loading = false;
            state.data = payload;
            state.err = null;
            return { ...state };
        case actionTypes.CREATE_CLASSROOM_FAILED:
            state.loading = false;
            state.data = null;
            state.err = payload;
            return { ...state };
        case actionTypes.CREATE_CLASSROOM_RESET:
            state.loading = false;
            state.data = null;
            state.err = null;
            return { ...state };
        default: return { ...state };
    }
}

// Join Classroom Reducer
const stateJoinClassroom = {
    loading: false,
    data: null,
    err: null
}

export const joinClassroomReducer = (state = stateJoinClassroom, { type, payload }) => {
    switch (type) {
        case actionTypes.JOIN_CLASSROOM_REQUEST:
            state.loading = true;
            state.data = null;
            state.err = null;
            return { ...state };
        case actionTypes.JOIN_CLASSROOM_SUCCESS:
            state.loading = false;
            state.data = payload;
            state.err = null;
            return { ...state };
        case actionTypes.JOIN_CLASSROOM_FAILED:
            state.loading = false;
            state.data = null;
            state.err = payload;
            return { ...state };
        case actionTypes.JOIN_CLASSROOM_RESET:
            state.loading = false;
            state.data = null;
            state.err = null;
            return { ...state };
        default: return { ...state };
    }
}

// Update Classroom Reducer
const stateUpdateClassroom = {
    loading: false,
    data: null,
    err: null
}

export const updateClassroomReducer = (state = stateUpdateClassroom, { type, payload }) => {
    switch (type) {
        case actionTypes.UPDATE_CLASSROOM_REQUEST:
            state.loading = true;
            state.data = null;
            state.err = null;
            return { ...state };
        case actionTypes.UPDATE_CLASSROOM_SUCCESS:
            state.loading = false;
            state.data = payload;
            state.err = null;
            return { ...state };
        case actionTypes.UPDATE_CLASSROOM_FAILED:
            state.loading = false;
            state.data = null;
            state.err = payload;
            return { ...state };
        case actionTypes.UPDATE_CLASSROOM_RESET:
            state.loading = false;
            state.data = null;
            state.err = null;
            return { ...state };
        default: return { ...state };
    }
}

// Delete Classroom Reducer
const stateDeleteClassroom = {
    loading: false,
    data: null,
    err: null
}

export const deleteClassroomReducer = (state = stateDeleteClassroom, { type, payload }) => {
    switch (type) {
        case actionTypes.DELETE_CLASSROOM_REQUEST:
            state.loading = true;
            state.data = null;
            state.err = null;
            return { ...state };
        case actionTypes.DELETE_CLASSROOM_SUCCESS:
            state.loading = false;
            state.data = payload;
            state.err = null;
            return { ...state };
        case actionTypes.DELETE_CLASSROOM_FAILED:
            state.loading = false;
            state.data = null;
            state.err = payload;
            return { ...state };
        case actionTypes.DELETE_CLASSROOM_RESET:
            state.loading = false;
            state.data = null;
            state.err = null;
            return { ...state };
        default: return { ...state };
    }
}

// Leave Classroom Reducer
const stateLeaveClassroom = {
    loading: false,
    data: null,
    err: null
}

export const leaveClassroomReducer = (state = stateLeaveClassroom, { type, payload }) => {
    switch (type) {
        case actionTypes.LEAVE_CLASSROOM_REQUEST:
            state.loading = true;
            state.data = null;
            state.err = null;
            return { ...state };
        case actionTypes.LEAVE_CLASSROOM_SUCCESS:
            state.loading = false;
            state.data = payload;
            state.err = null;
            return { ...state };
        case actionTypes.LEAVE_CLASSROOM_FAILED:
            state.loading = false;
            state.data = null;
            state.err = payload;
            return { ...state };
        case actionTypes.LEAVE_CLASSROOM_RESET:
            state.loading = false;
            state.data = null;
            state.err = null;
            return { ...state };
        default: return { ...state };
    }
}