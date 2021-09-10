import { ActionTypes } from '../types/action-types';

const setProjects = (projects) => {
    return {
        type: ActionTypes.SET_USER_PROJECTS,
        payload: projects,
    };
};

export {
    setProjects,
}