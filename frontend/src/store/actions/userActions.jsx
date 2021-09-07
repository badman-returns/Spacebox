import { UserActionTypes } from '../types/user-action-types';

const setUserInfo = (user) => {
    return {
        type: UserActionTypes.SET_USER_INFO,
        payload: user,
    };
};

const setUserGithubInfo = (gitUser) => {
    return {
        type: UserActionTypes.SET_USER_GITHUB_INFO,
        payload: gitUser,
    }
};

export {
    setUserInfo,
    setUserGithubInfo
}