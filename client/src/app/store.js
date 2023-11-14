import { configureStore } from '@reduxjs/toolkit';
import { authApi } from './api/auth.api';
import { userApi } from './api/user.api';
import userReducer from './features/user.slice';

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    userSlice: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat([authApi.middleware, userApi.middleware]),
  // userApi.middleware
});
