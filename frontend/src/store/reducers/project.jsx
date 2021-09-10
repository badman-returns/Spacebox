import { ActionTypes } from "../types/action-types";

const initialState = {
    projects: [],
}


const projectReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case ActionTypes.SET_USER_PROJECTS:
            return { ...state, projects: payload };
        default:
            return state;
    }
};

export {
    projectReducer,
}