import { combineReducers } from "redux";
import { userInfoReducer, userGitInfoReducer } from "./user";
import { postReducer } from "./post";
import { projectReducer } from "./project";
import { persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['userInfo', 'userGitInfo', 'projects', 'posts']
}

const reducers = combineReducers({
    userInfo: userInfoReducer,
    userGitInfo: userGitInfoReducer,
    githubProjects: projectReducer,
    posts: postReducer,
});

export default persistReducer(persistConfig, reducers);