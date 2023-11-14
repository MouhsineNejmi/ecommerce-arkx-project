import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'ecommerce-api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/v1' }),
  endpoints: () => ({}),
});
