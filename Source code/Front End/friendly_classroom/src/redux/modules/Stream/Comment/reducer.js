import * as actionTypes from "./constants";

// Create Comment Reducer
const stateCreateComment = {
    loading: false,
    data: null,
    err: null
}

export const createCommentReducer = (state = stateCreateComment, { type, payload }) => {
    switch (type) {
        case actionTypes.CREATE_COMMENT_REQUEST:
            state.loading = true;
            state.data = null;
            state.err = null;
            return { ...state };
        case actionTypes.CREATE_COMMENT_SUCCESS:
            state.loading = false;
            state.data = payload;
            state.err = null;
            return { ...state };
        case actionTypes.CREATE_COMMENT_FAILED:
            state.loading = false;
            state.data = null;
            state.err = payload;
            return { ...state };
        case actionTypes.CREATE_COMMENT_RESET:
            state.loading = false;
            state.data = null;
            state.err = null;
            return { ...state };
        default: return { ...state };
    }
}


// Update Comment Reducer
const stateUpdateComment = {
    loading: false,
    data: null,
    err: null
}

export const updateCommentReducer = (state = stateUpdateComment, { type, payload }) => {
    switch (type) {
        case actionTypes.UPDATE_COMMENT_REQUEST:
            state.loading = true;
            state.data = null;
            state.err = null;
            return { ...state };
        case actionTypes.UPDATE_COMMENT_SUCCESS:
            state.loading = false;
            state.data = payload;
            state.err = null;
            return { ...state };
        case actionTypes.UPDATE_COMMENT_FAILED:
            state.loading = false;
            state.data = null;
            state.err = payload;
            return { ...state };
        case actionTypes.UPDATE_COMMENT_RESET:
            state.loading = false;
            state.data = null;
            state.err = null;
            return { ...state };
        default: return { ...state };
    }
}


// Delete Comment Reducer
const stateDeleteComment = {
    loading: false,
    data: null,
    err: null
}

export const deleteCommentReducer = (state = stateDeleteComment, { type, payload }) => {
    switch (type) {
        case actionTypes.DELETE_COMMENT_REQUEST:
            state.loading = true;
            state.data = null;
            state.err = null;
            return { ...state };
        case actionTypes.DELETE_COMMENT_SUCCESS:
            state.loading = false;
            state.data = payload;
            state.err = null;
            return { ...state };
        case actionTypes.DELETE_COMMENT_FAILED:
            state.loading = false;
            state.data = null;
            state.err = payload;
            return { ...state };
        case actionTypes.DELETE_COMMENT_RESET:
            state.loading = false;
            state.data = null;
            state.err = null;
            return { ...state };
        default: return { ...state };
    }
}