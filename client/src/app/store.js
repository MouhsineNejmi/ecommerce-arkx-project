import { configureStore } from "@reduxjs/toolkit"
import { apiSlice } from "./api/authApi"
import authReducer from './features/auth/authSlice'

const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
})

export default store