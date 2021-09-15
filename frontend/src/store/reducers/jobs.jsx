import { ActionTypes } from "../types/action-types";

const initialState = {
    jobs: [],
}

const jobReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case ActionTypes.SET_JOBS:
            return { ...state, jobs: payload };
        default:
            return state;
    }
};
const currentJobReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case ActionTypes.SET_JOBS_BY_ID:
            return { ...state, job: payload };
        default:
            return state;
    }
};
const userJobReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case ActionTypes.SET_JOBS_BY_USERID:
            return { ...state, jobs: payload };
        default:
            return state;
    }
};
export{
    jobReducer,
    currentJobReducer,
    userJobReducer
}