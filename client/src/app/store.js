import { configureStore } from '@reduxjs/toolkit';

import { authApi } from './api/auth.api';

import { usersApi } from './api/users.api';
import { customersApi } from './api/customers.api';
import { productsApi } from './api/products.api';
import { uploadApi } from './api/upload.api';
import { ordersApi } from './api/orders.api';
import { paymentApi } from './api/payment.api';
import { categoriesApi } from './api/categories.api';
import { cartApi } from './api/cart.api';
import { favoritesApi } from './api/favorites.api';

import userReducer from './features/user.slice';
import cartReducer from './features/cart.slice';
import favoritesReducer from './features/favorties.slice';

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [customersApi.reducerPath]: customersApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [uploadApi.reducerPath]: uploadApi.reducer,
    [ordersApi.reducerPath]: ordersApi.reducer,
    [paymentApi.reducerPath]: paymentApi.reducer,
    [categoriesApi.reducerPath]: categoriesApi.reducer,
    [cartApi.reducerPath]: cartApi.reducer,
    [favoritesApi.reducerPath]: favoritesApi.reducer,
    userSlice: userReducer,
    cartSlice: cartReducer,
    favoritesSlice: favoritesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat([
      authApi.middleware,
      usersApi.middleware,
      customersApi.middleware,
      productsApi.middleware,
      uploadApi.middleware,
      ordersApi.middleware,
      paymentApi.middleware,
      categoriesApi.middleware,
      cartApi.middleware,
      favoritesApi.middleware,
    ]),
});
