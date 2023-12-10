import { apiSlice } from './api';

export const ordersApi = apiSlice.injectEndpoints({
  tags: ['Orders'],
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (data) => {
        return {
          url: 'orders',
          method: 'POST',
          body: data,
          credentials: 'include',
        };
      },
      transformResponse: (result) => result.data,
    }),
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
    getOrderByCustomerId: builder.mutation({
      query: (customer_id) => {
        return {
          url: `orders/customer/${customer_id}`,
          credentials: 'include',
        };
      },
      transformResponse: (result) => result.data,
    }),
  }),
});

export const {
  useGetAllOrdersQuery,
  useGetOrderByIdQuery,
  useCreateOrderMutation,
  useGetOrderByCustomerIdMutation,
} = ordersApi;
