import { configureStore } from '@reduxjs/toolkit';
import alertReducer from './slices/alertSlice';
import authReducer from './slices/authSlice';
import dialogReducer from './slices/dialogSlice';
import userReducer from './slices/userSlice';
import { thunk } from 'redux-thunk';

const store = configureStore({
    reducer: {
        alert: alertReducer,
        auth: authReducer,
        dialog: dialogReducer,
        user: userReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    }).concat(thunk),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;