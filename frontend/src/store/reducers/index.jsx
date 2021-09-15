import { combineReducers } from "redux";
import { userInfoReducer, userGitInfoReducer, userProfileReducer } from "./user";
import { postReducer, userPostReducer } from "./post";
import { jobReducer, currentJobReducer, userJobReducer } from "./jobs";
import { projectReducer } from "./project";
import { persistReducer } from "redux-persist";
import sessionStorage from "redux-persist/es/storage/session";

const persistConfig = {
    key: 'root',
    storage: sessionStorage,
    whitelist: ['userInfo', 'userGitInfo', 'projects', 'posts', 'userPosts', 'profileInfo', 'jobs', 'currentJob', 'userJobs']
}

const reducers = combineReducers({
    userInfo: userInfoReducer,
    userGitInfo: userGitInfoReducer,
    githubProjects: projectReducer,
    posts: postReducer,
    userPosts: userPostReducer,
    profileInfo: userProfileReducer,
    jobs: jobReducer,
    currentJob: currentJobReducer,
    userJobs: userJobReducer
});

export default persistReducer(persistConfig, reducers);