import * as actionTypes from "./constants";

// Fetch All Calendar Reducer
const stateFetchAllCalendar = {
    loading: false,
    data: null,
    err: null
}

export const fetchAllCalendarReducer = (state = stateFetchAllCalendar, { type, payload }) => {
    switch (type) {
        case actionTypes.FETCH_ALL_CALENDAR_REQUEST:
            state.loading = true;
            state.data = null;
            state.err = null;
            return { ...state };
        case actionTypes.FETCH_ALL_CALENDAR_SUCCESS:
            state.loading = false;
            state.data = payload;
            state.err = null;
            return { ...state };
        case actionTypes.FETCH_ALL_CALENDAR_FAILED:
            state.loading = false;
            state.data = null;
            state.err = payload;
            return { ...state };
        case actionTypes.FETCH_ALL_CALENDAR_RESET:
            state.loading = false;
            state.data = null;
            state.err = null;
            return { ...state };    
        default: return { ...state };
    }
}



