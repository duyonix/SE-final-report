import * as actionTypes from "./constants";

// Fetch All Score Classroom Reducer
const stateAllScoreClassroom = {
    loading: false,
    data: null,
    err: null,

}

export const fetchAllScoreClassroomReducer = (state = stateAllScoreClassroom, { type, payload }) => {
    switch (type) {
        case actionTypes.FETCH_ALL_SCORE_CLASSROOM_REQUEST:
            state.loading = true;
            state.data = null;
            state.err = null;
            return { ...state };
        case actionTypes.FETCH_ALL_SCORE_CLASSROOM_SUCCESS:
            state.loading = false;
            state.data = payload;
            state.err = null;
            return { ...state };
        case actionTypes.FETCH_ALL_SCORE_CLASSROOM_FAILED:
            state.loading = false;
            state.data = null;
            state.err = payload;
            return { ...state };
        default: return { ...state };
    }
}


// Fetch All ScoreUser Reducer
const stateAllScoreUser = {
    loading: false,
    data: null,
    err: null,

}

export const fetchAllScoreUserReducer = (state = stateAllScoreUser, { type, payload }) => {
    switch (type) {
        case actionTypes.FETCH_ALL_SCORE_USER_REQUEST:
            state.loading = true;
            state.data = null;
            state.err = null;
            return { ...state };
        case actionTypes.FETCH_ALL_SCORE_USER_SUCCESS:
            state.loading = false;
            state.data = payload;
            state.err = null;
            return { ...state };
        case actionTypes.FETCH_ALL_SCORE_USER_FAILED:
            state.loading = false;
            state.data = null;
            state.err = payload;
            return { ...state };
        default: return { ...state };
    }
}