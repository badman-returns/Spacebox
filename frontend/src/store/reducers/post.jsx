import { ActionTypes } from "../types/action-types";

const initialState = {
    posts: [],
}


const postReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case ActionTypes.SET_POST:
            return { ...state, posts: payload };
        default:
            return state;
    }
};

const userPostReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case ActionTypes.SET_POST_BY_ID:
            return { ...state, posts: payload };
        default:
            return state;
    }
};

export {
    postReducer,
    userPostReducer
}