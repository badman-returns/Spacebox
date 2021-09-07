import { UserActionTypes } from "../types/user-action-types";

const initialState = {
    user: {},
}


const userInfoReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case UserActionTypes.SET_USER_INFO:
            return { ...state, user: payload };
        default:
            return state;
    }
};

const userGitInfoReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case UserActionTypes.SET_USER_GITHUB_INFO:
            return {...state, user: payload};
        default:
            return state;
    }
}

export {
    userInfoReducer,
    userGitInfoReducer
}