import { configureStore } from '@reduxjs/toolkit';

import { authApi } from './api/auth.api';

import { usersApi } from './api/users.api';
import { customersApi } from './api/customers.api';
import { productsApi } from './api/products.api';
import { subcategoriesApi } from './api/subcategories.api';

import userReducer from './features/user.slice';

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [customersApi.reducerPath]: customersApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [subcategoriesApi.reducerPath]: subcategoriesApi.reducer,
    userSlice: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat([
      authApi.middleware,
      usersApi.middleware,
      customersApi.middleware,
      productsApi.middleware,
      subcategoriesApi.middleware,
    ]),
});
