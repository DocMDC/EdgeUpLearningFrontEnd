import { configureStore } from "@reduxjs/toolkit"
import { apiSlice } from "./api/apiSlice"
import localStorageMiddleware from "./middleware/localStorage"
import authReducer from './slices/authSlice'
import modalReducer from './slices/modalSlice'
import createExamReducer from "./slices/createExamSlice"
import darkModeReducer from "./slices/darkModeSlice"

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer,
        modal: modalReducer,
        darkMode: darkModeReducer,
        createExam: createExamReducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(apiSlice.middleware, localStorageMiddleware),
    devTools: true
})