import { combineReducers, configureStore } from '@reduxjs/toolkit';
import LoggedReducer from './reducers/LoggedReducer';

// 1. 여러개의 리듀서를 하나로 합친다.
const rootReducer = combineReducers({
    LoggedReducer: LoggedReducer,    // 여기에 파일 추가 가능
});

// 2. 합쳐진 리듀서를 스토어에 담는다.
const store = configureStore({
    reducer: rootReducer
});

export default store;