import * as actionTypes from "./constants";

const submissionState = {
    loading: false,
    data: null,
    err: null,

}

export const submissionReducer = (state = submissionState, { type, payload }) => {
    switch (type) {

        case actionTypes.SUBMISSION_REQUEST:
            state.loading = true;
            state.data = null;
            state.err = null;
            return { ...state };
        case actionTypes.SUBMISSION_SUCCESS:
            state.loading = false;
            state.data = payload;
            state.err = null;
            return { ...state };
        case actionTypes.SUBMISSION_FAILED:
            state.loading = false;
            state.data = null;
            state.err = payload;
            return { ...state };
        case actionTypes.SUBMISSION_RESET:
            state.loading = false;
            state.data = null;
            state.err = null;
            return { ...state };

        default:
            return { ...state };
    }
}


const deleteSubmissionState = {
    loading: false,
    data: null,
    err: null,

}

export const submissionDeleteReducer = (state = deleteSubmissionState, { type, payload }) => {
    switch (type) {

        case actionTypes.SUBMISSION_DELETE_REQUEST:
            state.loading = true;
            state.data = null;
            state.err = null;
            return { ...state };
        case actionTypes.SUBMISSION_DELETE_SUCCESS:
            state.loading = false;
            state.data = payload;
            state.err = null;
            return { ...state };
        case actionTypes.SUBMISSION_DELETE_FAILED:
            state.loading = false;
            state.data = null;
            state.err = payload;
            return { ...state };
        case actionTypes.SUBMISSION_DELETE_RESET:
            state.loading = false;
            state.data = null;
            state.err = null;
            return { ...state };

        default:
            return { ...state };
    }
}



const submit_homeworkState = {
    loading: false,
    data: null,
    err: null,

}

export const submit_homeworkReducer = (state = submit_homeworkState, { type, payload }) => {
    switch (type) {

        case actionTypes.SUBMIT_HOMEWORK_REQUEST:
            state.loading = true;
            state.data = null;
            state.err = null;
            return { ...state };
        case actionTypes.SUBMIT_HOMEWORK_SUCCESS:
            state.loading = false;
            state.data = payload;
            state.err = null;
            return { ...state };
        case actionTypes.SUBMIT_HOMEWORK_FAILED:
            state.loading = false;
            state.data = null;
            state.err = payload;
            return { ...state };
        case actionTypes.SUBMIT_HOMEWORK_RESET:
            state.loading = false;
            state.data = null;
            state.err = null;
            return { ...state };

        default:
            return { ...state };
    }
}