import * as actionTypes from "./constants";

// Fetch All Submission Reducer
const stateAllSubmission = {
    loading: false,
    data: null,
    err: null,

}

export const fetchAllSubmissionReducer = (state = stateAllSubmission, { type, payload }) => {
    switch (type) {
        case actionTypes.FETCH_ALL_SUBMISSION_REQUEST:
            state.loading = true;
            state.data = null;
            state.err = null;
            return { ...state };
        case actionTypes.FETCH_ALL_SUBMISSION_SUCCESS:
            state.loading = false;
            state.data = payload;
            state.err = null;
            return { ...state };
        case actionTypes.FETCH_ALL_SUBMISSION_FAILED:
            state.loading = false;
            state.data = null;
            state.err = payload;
            return { ...state };
        default: return { ...state };
    }
}

// Add Score Reducer
const stateAddScore = {
    loading: false,
    data: null,
    err: null
}

export const addScoreReducer = (state = stateAddScore, { type, payload }) => {
    switch (type) {
        case actionTypes.ADD_SCORE_REQUEST:
            state.loading = true;
            state.data = null;
            state.err = null;
            return { ...state };
        case actionTypes.ADD_SCORE_SUCCESS:
            state.loading = false;
            state.data = payload;
            state.err = null;
            return { ...state };
        case actionTypes.ADD_SCORE_FAILED:
            state.loading = false;
            state.data = null;
            state.err = payload;
            return { ...state };
        case actionTypes.ADD_SCORE_RESET:
            state.loading = false;
            state.data = null;
            state.err = null;
            return { ...state };
        default: return { ...state };
    }
}