import { configureStore } from '@reduxjs/toolkit';
import { authApi } from './api/auth.api';
import { usersApi } from './api/users.api';
import userReducer from './features/user.slice';

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    userSlice: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat([authApi.middleware, usersApi.middleware]),
  // userApi.middleware
});
