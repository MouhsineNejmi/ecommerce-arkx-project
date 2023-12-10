import { apiSlice } from './api';

export const paymentApi = apiSlice.injectEndpoints({
  tagTypes: ['Payment'],
  endpoints: (builder) => ({
    stripePayment: builder.mutation({
      query(cartItems) {
        return {
          url: 'payment/create-checkout-session',
          method: 'POST',
          body: { cartItems },
          credentials: 'include',
        };
      },
      transformResponse: (result) => result.data,
      providesTags: ['Payment'],
    }),
    createPaymentIntent: builder.mutation({
      query(amount) {
        return {
          url: 'payment/create-payment-intent',
          method: 'POST',
          body: { amount },
          credentials: 'include',
        };
      },
      transformResponse: (result) => result.data,
      providesTags: ['Payment'],
    }),
    createPayment: builder.mutation({
      query(data) {
        return {
          url: 'payment/create-payment',
          method: 'POST',
          body: data,
          credentials: 'include',
        };
      },
      transformResponse: (result) => result.data,
      providesTags: ['Payment'],
    }),
    getAllPayments: builder.query({
      query() {
        return {
          url: 'payment',
          credentials: 'include',
        };
      },
      transformResponse: (result) => result.data,
    }),
    getPaymentById: builder.query({
      query: (paymentId) => {
        return {
          url: `payment/${paymentId}`,
          credentials: 'include',
        };
      },
      transformResponse: (result) => result.data,
    }),
  }),
});

export const {
  useStripePaymentMutation,
  useCreatePaymentIntentMutation,
  useCreatePaymentMutation,
  useGetAllPaymentsQuery,
  useGetPaymentByIdQuery,
} = paymentApi;
