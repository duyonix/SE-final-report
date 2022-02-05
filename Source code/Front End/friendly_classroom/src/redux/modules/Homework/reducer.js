import * as actionTypes from "./constants";

const homeworkState = {
    loading: false,
    data: null,
    err: null,
    key: ""
}

export const homeworkReducer = (state = homeworkState, { type, payload }) => {
    switch (type) {

        case actionTypes.HOMEWORK_REQUEST:
            state.loading = true;
            state.data = null;
            state.err = null;
            return { ...state };
        case actionTypes.HOMEWORK_SUCCESS:
            state.loading = false;
            state.data = payload;
            state.err = null;
            return { ...state };
        case actionTypes.HOMEWORK_FAILED:
            state.loading = false;
            state.data = null;
            state.err = payload;
            return { ...state };
        case actionTypes.HOMEWORK_RESET:
            state.loading = false;
            state.data = null;
            state.err = null;
            return { ...state };
        case actionTypes.HOMEWORK_SEARCH:
            state.key = payload;
            return { ...state };
        default:
            return { ...state };
    }
}

const homeworkDetailState = {
    loading: false,
    data: null,
    err: null,

}

export const homeworkDetailReducer = (state = homeworkDetailState, { type, payload }) => {
    switch (type) {

        case actionTypes.HOMEWORK_DETAIL_REQUEST:
            state.loading = true;
            state.data = null;
            state.err = null;
            return { ...state };
        case actionTypes.HOMEWORK_DETAIL_SUCCESS:
            state.loading = false;
            state.data = payload;
            state.err = null;
            return { ...state };
        case actionTypes.HOMEWORK_DETAIL_FAILED:
            state.loading = false;
            state.data = null;
            state.err = payload;
            return { ...state };
        case actionTypes.HOMEWORK_DETAIL_RESET:
            state.loading = false;
            state.data = null;
            state.err = null;
            return { ...state };

        default:
            return { ...state };
    }
}




const documentState = {
    loading: false,
    data: null,
    err: null,
    key: ""
}

export const documentReducer = (state = documentState, { type, payload }) => {
    switch (type) {

        case actionTypes.DOCUMENT_REQUEST:
            state.loading = true;
            state.data = null;
            state.err = null;
            return { ...state };
        case actionTypes.DOCUMENT_SUCCESS:
            state.loading = false;
            state.data = payload;
            state.err = null;
            return { ...state };
        case actionTypes.DOCUMENT_FAILED:
            state.loading = false;
            state.data = null;
            state.err = payload;
            return { ...state };
        case actionTypes.DOCUMENT_RESET:
            state.loading = false;
            state.data = null;
            state.err = null;
            return { ...state };
        case actionTypes.DOCUMENT_SEARCH:
            state.key = payload;
            return { ...state };
        default:
            return { ...state };
    }
}



const documentDetailState = {
    loading: false,
    data: null,
    err: null,

}

export const documentDetailReducer = (state = documentDetailState, { type, payload }) => {
    switch (type) {

        case actionTypes.DOCUMENT_DETAIL_REQUEST:
            state.loading = true;
            state.data = null;
            state.err = null;
            return { ...state };
        case actionTypes.DOCUMENT_DETAIL_SUCCESS:
            state.loading = false;
            state.data = payload;
            state.err = null;
            return { ...state };
        case actionTypes.DOCUMENT_DETAIL_FAILED:
            state.loading = false;
            state.data = null;
            state.err = payload;
            return { ...state };
        case actionTypes.DOCUMENT_DETAIL_RESET:
            state.loading = false;
            state.data = null;
            state.err = null;
            return { ...state };

        default:
            return { ...state };
    }
}

// Create Homework Reducer
const stateCreateHomework = {
    loading: false,
    data: null,
    err: null
}

export const createHomeworkReducer = (state = stateCreateHomework, { type, payload }) => {
    switch (type) {
        case actionTypes.CREATE_HOMEWORK_REQUEST:
            state.loading = true;
            state.data = null;
            state.err = null;
            return { ...state };
        case actionTypes.CREATE_HOMEWORK_SUCCESS:
            state.loading = false;
            state.data = payload;
            state.err = null;
            return { ...state };
        case actionTypes.CREATE_HOMEWORK_FAILED:
            state.loading = false;
            state.data = null;
            state.err = payload;
            return { ...state };
        case actionTypes.CREATE_HOMEWORK_RESET:
            state.loading = false;
            state.data = null;
            state.err = null;
            return { ...state };
        default: return { ...state };
    }
}


// Create Document Reducer
const stateCreateDocument = {
    loading: false,
    data: null,
    err: null
}

export const createDocumentReducer = (state = stateCreateDocument, { type, payload }) => {
    switch (type) {
        case actionTypes.CREATE_DOCUMENT_REQUEST:
            state.loading = true;
            state.data = null;
            state.err = null;
            return { ...state };
        case actionTypes.CREATE_DOCUMENT_SUCCESS:
            state.loading = false;
            state.data = payload;
            state.err = null;
            return { ...state };
        case actionTypes.CREATE_DOCUMENT_FAILED:
            state.loading = false;
            state.data = null;
            state.err = payload;
            return { ...state };
        case actionTypes.CREATE_DOCUMENT_RESET:
            state.loading = false;
            state.data = null;
            state.err = null;
            return { ...state };
        default: return { ...state };
    }
}