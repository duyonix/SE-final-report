import * as actionTypes from "./constants";

// Fetch All Todo Reducer
const stateFetchAllTodo = {
    loading: false,
    data: null,
    err: null
}

export const fetchAllTodoReducer = (state = stateFetchAllTodo, { type, payload }) => {
    switch (type) {
        case actionTypes.FETCH_ALL_TODO_REQUEST:
            state.loading = true;
            state.data = null;
            state.err = null;
            return { ...state };
        case actionTypes.FETCH_ALL_TODO_SUCCESS:
            state.loading = false;
            state.data = payload;
            state.err = null;
            return { ...state };
        case actionTypes.FETCH_ALL_TODO_FAILED:
            state.loading = false;
            state.data = null;
            state.err = payload;
            return { ...state };    
        default: return { ...state };
    }
}


