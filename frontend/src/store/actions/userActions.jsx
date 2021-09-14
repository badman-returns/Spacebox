import { ActionTypes } from '../types/action-types';

const setUserInfo = (user) => {
    return {
        type: ActionTypes.SET_USER_INFO,
        payload: user,
    };
};

const setUserProfile = (user) => {
    return {
        type: ActionTypes.SET_USER_PROFILE,
        payload: user,
    }
}

const setUserGithubInfo = (gitUser) => {
    return {
        type: ActionTypes.SET_USER_GITHUB_INFO,
        payload: gitUser,
    }
};

export {
    setUserInfo,
    setUserGithubInfo,
    setUserProfile
}