import * as actionTypes from "./constants";


const stateChangeAvatar = {
    loading: false,
    data: null,
    err: null
}

export const changeAvatarReducer = (state = stateChangeAvatar, { type, payload }) => {
    switch (type) {
        case actionTypes.CHANGE_AVATAR_REQUEST:
            state.loading = true;
            state.data = null;
            state.err = null;
            return { ...state };
        case actionTypes.CHANGE_AVATAR_SUCCESS:
            state.loading = false;
            state.data = payload;
            state.err = null;
            return { ...state };
        case actionTypes.CHANGE_AVATAR_FAILED:

            state.loading = false;
            state.data = null;
            state.err = payload;
            return { ...state };
        case actionTypes.CHANGE_AVATAR_RESET:
            state.loading = false;
            state.data = null;
            state.err = null;
            return { ...state };
        default: return { ...state };
    }
}


