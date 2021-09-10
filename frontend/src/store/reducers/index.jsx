import { combineReducers } from "redux";
import { userInfoReducer, userGitInfoReducer } from "./user";
import { postReducer, userPostReducer } from "./post";
import { projectReducer } from "./project";
import { persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['userInfo', 'userGitInfo', 'projects', 'posts', 'userPosts']
}

const reducers = combineReducers({
    userInfo: userInfoReducer,
    userGitInfo: userGitInfoReducer,
    githubProjects: projectReducer,
    posts: postReducer,
    userPosts: userPostReducer,
});

export default persistReducer(persistConfig, reducers);