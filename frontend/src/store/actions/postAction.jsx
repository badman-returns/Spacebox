import { ActionTypes } from '../types/action-types';

const setPosts = (post) => {
    return {
        type: ActionTypes.SET_POST,
        payload: post,
    };
};

const setPostById = (posts) => {
    return {
        type: ActionTypes.SET_POST_BY_ID,
        payload: posts,
    }
}

export {
    setPosts,
    setPostById
}