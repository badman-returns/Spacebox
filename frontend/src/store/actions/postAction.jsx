import { ActionTypes } from '../types/action-types';

const setPosts = (post) => {
    return {
        type: ActionTypes.SET_POST,
        payload: post,
    };
};

export {
    setPosts,
}