import { combineReducers } from "redux";
import { userInfoReducer, userGitInfoReducer, userProfileReducer } from "./user";
import { postReducer, userPostReducer } from "./post";
import { projectReducer } from "./project";
import { persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['userInfo', 'userGitInfo', 'projects', 'posts', 'userPosts', 'profileInfo']
}

const reducers = combineReducers({
    userInfo: userInfoReducer,
    userGitInfo: userGitInfoReducer,
    githubProjects: projectReducer,
    posts: postReducer,
    userPosts: userPostReducer,
    profileInfo: userProfileReducer,
});

export default persistReducer(persistConfig, reducers);