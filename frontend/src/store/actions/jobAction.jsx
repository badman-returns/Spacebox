import { ActionTypes } from '../types/action-types';

const setJobs = (jobs) => {
    return {
        type: ActionTypes.SET_JOBS,
        payload: jobs,
    };
};

const setCurrentJobs = (job) => {
    return {
        type: ActionTypes.SET_JOBS_BY_ID,
        payload: job,
    };
};

const setUserJobs = (jobs) => {
    return {
        type: ActionTypes.SET_JOBS_BY_USERID,
        payload: jobs,
    };
};

export {
    setJobs,
    setCurrentJobs,
    setUserJobs
}