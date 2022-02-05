import * as actionTypes from "./constants";

// Fetch All Post Reducer
const stateFetchAllPost = {
    loading: false,
    data: null,
    err: null
}

export const fetchAllPostReducer = (state = stateFetchAllPost, { type, payload }) => {
    switch (type) {
        case actionTypes.FETCH_ALL_POST_REQUEST:
            state.loading = true;
            state.data = null;
            state.err = null;
            return { ...state };
        case actionTypes.FETCH_ALL_POST_SUCCESS:
            state.loading = false;
            state.data = payload;
            state.err = null;
            return { ...state };
        case actionTypes.FETCH_ALL_POST_FAILED:
            state.loading = false;
            state.data = null;
            state.err = payload;
            return { ...state };
        default: return { ...state };
    }
}


// Fetch 1 Post Reducer
const stateFetchSinglePost = {
    loading: false,
    data: null,
    err: null
}

export const fetchSinglePostReducer = (state = stateFetchSinglePost, { type, payload }) => {
    switch (type) {
        case actionTypes.FETCH_SINGLE_POST_REQUEST:
            state.loading = true;
            state.data = null;
            state.err = null;
            return { ...state };
        case actionTypes.FETCH_SINGLE_POST_SUCCESS:
            state.loading = false;
            state.data = payload;
            state.err = null;
            return { ...state };
        case actionTypes.FETCH_SINGLE_POST_FAILED:
            state.loading = false;
            state.data = null;
            state.err = payload;
            return { ...state };
        default: return { ...state };
    }
}


// Create Post Reducer
const stateCreatePost = {
    loading: false,
    data: null,
    err: null
}

export const createPostReducer = (state = stateCreatePost, { type, payload }) => {
    switch (type) {
        case actionTypes.CREATE_POST_REQUEST:
            state.loading = true;
            state.data = null;
            state.err = null;
            return { ...state };
        case actionTypes.CREATE_POST_SUCCESS:
            state.loading = false;
            state.data = payload;
            state.err = null;
            return { ...state };
        case actionTypes.CREATE_POST_FAILED:
            state.loading = false;
            state.data = null;
            state.err = payload;
            return { ...state };
        case actionTypes.CREATE_POST_RESET:
            state.loading = false;
            state.data = null;
            state.err = null;
            return { ...state };
        default: return { ...state };
    }
}


// Update Post Reducer
const stateUpdatePost = {
    loading: false,
    data: null,
    err: null
}

export const updatePostReducer = (state = stateUpdatePost, { type, payload }) => {
    switch (type) {
        case actionTypes.UPDATE_POST_REQUEST:
            state.loading = true;
            state.data = null;
            state.err = null;
            return { ...state };
        case actionTypes.UPDATE_POST_SUCCESS:
            state.loading = false;
            state.data = payload;
            state.err = null;
            return { ...state };
        case actionTypes.UPDATE_POST_FAILED:
            state.loading = false;
            state.data = null;
            state.err = payload;
            return { ...state };
        case actionTypes.UPDATE_POST_RESET:
            state.loading = false;
            state.data = null;
            state.err = null;
            return { ...state };
        default: return { ...state };
    }
}


// Delete Post Reducer
const stateDeletePost = {
    loading: false,
    data: null,
    err: null
}

export const deletePostReducer = (state = stateDeletePost, { type, payload }) => {
    switch (type) {
        case actionTypes.DELETE_POST_REQUEST:
            state.loading = true;
            state.data = null;
            state.err = null;
            return { ...state };
        case actionTypes.DELETE_POST_SUCCESS:
            state.loading = false;
            state.data = payload;
            state.err = null;
            return { ...state };
        case actionTypes.DELETE_POST_FAILED:
            state.loading = false;
            state.data = null;
            state.err = payload;
            return { ...state };
        case actionTypes.DELETE_POST_RESET:
            state.loading = false;
            state.data = null;
            state.err = null;
            return { ...state };
        default: return { ...state };
    }
}