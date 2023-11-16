import { configureStore } from '@reduxjs/toolkit';

import { authApi } from './api/auth.api';
import { userApi } from './api/user.api';
import { productsApi } from './api/products.api';
import { subcategoriesApi } from './api/subcategories.api';
import userReducer from './features/user.slice';

export const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        [productsApi.reducerPath]: productsApi.reducer,
        [subcategoriesApi.reducerPath]: subcategoriesApi.reducer,
        userSlice: userReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({}).concat([
            authApi.middleware,
            userApi.middleware,
            productsApi.middleware,
            subcategoriesApi.middleware,
        ]),
    // userApi.middleware
});
