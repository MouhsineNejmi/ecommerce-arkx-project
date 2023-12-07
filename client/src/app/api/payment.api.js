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
  }),
});

export const { useStripePaymentMutation, useCreatePaymentIntentMutation } =
  paymentApi;
