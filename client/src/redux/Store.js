import {combineReducers,configureStore} from '@reduxjs/toolkit';

import authSlice from './authSlice';

import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER
} from 'redux-persist';

import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key:'root',
    version:1,
    storage
}

const rootReducers = combineReducers({
    auth:authSlice
})

const persistedReducer = persistReducer(persistConfig,rootReducers)


const store = configureStore({
    reducer:persistedReducer,
    middleware:(getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck:{
                ignoreActions : [FLUSH,REHYDRATE,PAUSE,PERSIST,PURGE,REGISTER],
            },
        }),
})

export default store;


