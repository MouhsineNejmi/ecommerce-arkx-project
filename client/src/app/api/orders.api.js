import { apiSlice } from './api';

export const ordersApi = apiSlice.injectEndpoints({
  tags: ['Orders'],
  endpoints: (builder) => ({
    getAllOrders: builder.query({
      query: () => {
        return {
          url: 'orders',
          credentials: 'include',
        };
      },
      transformResponse: (result) => {
        return result.data;
      },
    }),
    getOrderById: builder.query({
      query: (orderId) => {
        return {
          url: `orders/${orderId}`,
          credentials: 'include',
        };
      },
      transformResponse: (result) => {
        return result.data;
      },
    }),
  }),
});

export const { useGetAllOrdersQuery, useGetOrderByIdQuery } = ordersApi;
