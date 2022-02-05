import * as actionTypes from "./constants";

const peopleState = {
    loading: false,
    data: null,
    err: null,
    change: false,
    key: "",
}

export const peopleReducer = (state = peopleState, { type, payload }) => {
    switch (type) {

        case actionTypes.PEOPLE_REQUEST:
            state.loading = true;
            state.data = null;
            state.err = null;
            state.change = false;
            return { ...state };
        case actionTypes.PEOPLE_SUCCESS:
            state.loading = false;
            state.data = payload;
            state.err = null;
            state.change = false;
            return { ...state };
        case actionTypes.PEOPLE_FAILED:
            state.loading = false;
            state.data = null;
            state.err = payload;
            state.change = false;
            return { ...state };
        case actionTypes.PEOPLE_RESET:
            state.loading = false;
            state.data = null;
            state.err = null;
            return { ...state };
        case actionTypes.PEOPLE_CHANGE:
            state.change = true;
            return { ...state };
        case actionTypes.PEOPLE_SEARCH:
            state.key = payload;
            return { ...state };
        case actionTypes.PEOPLE_SEARCH_RESET:
            state.key = "";
            return { ...state };
        default:
            return { ...state };
    }
}




const inviteStudentState = {
    loading: false,
    data: null,
    err: null

}

export const inviteStudentReducer = (state = inviteStudentState, { type, payload }) => {
    switch (type) {

        case actionTypes.INVITE_STUDENT_REQUEST:
            state.loading = true;
            state.data = null;
            state.err = null;
            return { ...state };
        case actionTypes.INVITE_STUDENT_SUCCESS:
            state.loading = false;
            state.data = payload;
            state.err = null;
            return { ...state };
        case actionTypes.INVITE_STUDENT_FAILED:
            state.loading = false;
            state.data = null;
            state.err = payload;
            return { ...state };
        case actionTypes.INVITE_STUDENT_RESET:
            state.loading = false;
            state.data = null;
            state.err = null;
            return { ...state };
        default:
            return { ...state };
    }
}


const deleteStudentState = {
    loading: false,
    data: null,
    err: null

}

export const deleteStudentReducer = (state = deleteStudentState, { type, payload }) => {
    switch (type) {

        case actionTypes.DELETE_STUDENT_REQUEST:
            state.loading = true;
            state.data = null;
            state.err = null;
            return { ...state };
        case actionTypes.DELETE_STUDENT_SUCCESS:
            state.loading = false;
            state.data = payload;
            state.err = null;
            return { ...state };
        case actionTypes.DELETE_STUDENT_FAILED:
            state.loading = false;
            state.data = null;
            state.err = payload;
            return { ...state };
        case actionTypes.DELETE_STUDENT_RESET:
            state.loading = false;
            state.data = null;
            state.err = null;
            return { ...state };
        default:
            return { ...state };
    }
}
