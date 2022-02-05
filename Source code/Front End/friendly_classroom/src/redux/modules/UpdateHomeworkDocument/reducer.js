import * as actionTypes from "./constants";

// Update Homework Reducer
const stateUpdateHomework = {
    loading: false,
    data: null,
    err: null
}

export const updateHomeworkReducer = (state = stateUpdateHomework, { type, payload }) => {
    switch (type) {
        case actionTypes.UPDATE_HOMEWORK_REQUEST:
            state.loading = true;
            state.data = null;
            state.err = null;
            return { ...state };
        case actionTypes.UPDATE_HOMEWORK_SUCCESS:
            state.loading = false;
            state.data = payload;
            state.err = null;
            return { ...state };
        case actionTypes.UPDATE_HOMEWORK_FAILED:
            state.loading = false;
            state.data = null;
            state.err = payload;
            return { ...state };
        case actionTypes.UPDATE_HOMEWORK_RESET:
            state.loading = false;
            state.data = null;
            state.err = null;
            return { ...state };
        default: return { ...state };
    }
}


// Update Homework File Reducer
const stateUpdateHomeworkFile = {
    loading: false,
    data: null,
    err: null
}

export const updateHomeworkFileReducer = (state = stateUpdateHomeworkFile, { type, payload }) => {
    switch (type) {
        case actionTypes.UPDATE_HOMEWORK_FILE_REQUEST:
            state.loading = true;
            state.data = null;
            state.err = null;
            return { ...state };
        case actionTypes.UPDATE_HOMEWORK_FILE_SUCCESS:
            state.loading = false;
            state.data = payload;
            state.err = null;
            return { ...state };
        case actionTypes.UPDATE_HOMEWORK_FILE_FAILED:
            state.loading = false;
            state.data = null;
            state.err = payload;
            return { ...state };
        case actionTypes.UPDATE_HOMEWORK_FILE_RESET:
            state.loading = false;
            state.data = null;
            state.err = null;
            return { ...state };
        default: return { ...state };
    }
}

// Update Document Reducer
const stateUpdateDocument = {
    loading: false,
    data: null,
    err: null
}

export const updateDocumentReducer = (state = stateUpdateDocument, { type, payload }) => {
    switch (type) {
        case actionTypes.UPDATE_DOCUMENT_REQUEST:
            state.loading = true;
            state.data = null;
            state.err = null;
            return { ...state };
        case actionTypes.UPDATE_DOCUMENT_SUCCESS:
            state.loading = false;
            state.data = payload;
            state.err = null;
            return { ...state };
        case actionTypes.UPDATE_DOCUMENT_FAILED:
            state.loading = false;
            state.data = null;
            state.err = payload;
            return { ...state };
        case actionTypes.UPDATE_DOCUMENT_RESET:
            state.loading = false;
            state.data = null;
            state.err = null;
            return { ...state };
        default: return { ...state };
    }
}


// Update Document File Reducer
const stateUpdateDocumentFile = {
    loading: false,
    data: null,
    err: null
}

export const updateDocumentFileReducer = (state = stateUpdateDocumentFile, { type, payload }) => {
    switch (type) {
        case actionTypes.UPDATE_DOCUMENT_FILE_REQUEST:
            state.loading = true;
            state.data = null;
            state.err = null;
            return { ...state };
        case actionTypes.UPDATE_DOCUMENT_FILE_SUCCESS:
            state.loading = false;
            state.data = payload;
            state.err = null;
            return { ...state };
        case actionTypes.UPDATE_DOCUMENT_FILE_FAILED:
            state.loading = false;
            state.data = null;
            state.err = payload;
            return { ...state };
        case actionTypes.UPDATE_DOCUMENT_FILE_RESET:
            state.loading = false;
            state.data = null;
            state.err = null;
            return { ...state };
        default: return { ...state };
    }
}