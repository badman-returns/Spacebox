import { combineReducers } from "redux";
import { userInfoReducer, userGitInfoReducer } from "./userReducer";
import { persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['userInfo', 'userGitInfo']
}

const reducers = combineReducers({
    userInfo: userInfoReducer,
    userGitInfo: userGitInfoReducer,
});

export default persistReducer(persistConfig, reducers);