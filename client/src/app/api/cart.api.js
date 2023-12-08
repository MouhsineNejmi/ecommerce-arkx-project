import { listCartItems } from '../features/cart.slice';
import { apiSlice } from './api';

export const cartApi = apiSlice.injectEndpoints({
  tagTypes: ['Cart'],
  endpoints: (builder) => ({
    getCart: builder.query({
      query() {
        return {
          url: 'cart',
          credentials: 'include',
        };
      },
      providesTags: ['Cart'],
      transformResponse: (result) => result.data,
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(listCartItems({ cart: data.items }));
        } catch (error) {
          /* Empty */
        }
      },
    }),
    addToCart: builder.mutation({
      query(productId) {
        return {
          url: 'cart/add',
          method: 'POST',
          body: { productId },
          credentials: 'include',
        };
      },
      transformResponse: (result) => result.data,
      providesTags: ['Cart'],
    }),
    decreaseQuantity: builder.mutation({
      query(productId) {
        return {
          url: 'cart/decrease',
          method: 'DELETE',
          body: { productId },
          credentials: 'include',
        };
      },
      providesTags: ['Cart'],
    }),
    removeFromCart: builder.mutation({
      query(productId) {
        return {
          url: `cart/remove/${productId}`,
          method: 'DELETE',
          credentials: 'include',
        };
      },
      providesTags: ['Cart'],
    }),
    clearCart: builder.mutation({
      query() {
        return {
          url: 'cart/clear-cart',
          method: 'DELETE',
          credentials: 'include',
        };
      },
    }),
  }),
});

export const {
  useGetCartQuery,
  useAddToCartMutation,
  useDecreaseQuantityMutation,
  useRemoveFromCartMutation,
  useClearCartMutation,
} = cartApi;
