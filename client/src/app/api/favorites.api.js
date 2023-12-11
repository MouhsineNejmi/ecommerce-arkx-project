import { listFavorites } from '../features/favorties.slice';
import { apiSlice } from './api';

export const favoritesApi = apiSlice.injectEndpoints({
  tags: ['Favorites'],
  endpoints: (builder) => ({
    getAllFavorites: builder.query({
      query() {
        return {
          url: 'favorites',
          credentials: 'include',
        };
      },
      providesTags: ['Favorites'],
      transformResponse: (result) => result.data,
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(listFavorites({ favorites: data.items }));
        } catch (error) {
          /* Empty */
        }
      },
    }),
    addToFavorites: builder.mutation({
      query(productId) {
        return {
          url: 'favorites/add',
          method: 'POST',
          body: { productId },
          credentials: 'include',
        };
      },
      transformResponse: (result) => result.data,
      providesTags: ['Favorites'],
    }),
    deleteFromFavorites: builder.mutation({
      query(favorite_id) {
        return {
          url: `favorites/delete/${favorite_id}`,
          method: 'DELETE',
          credentials: 'include',
        };
      },
      providesTags: ['Favorites'],
    }),
    getFavoriteById: builder.mutation({
      query(favorite_id) {
        return {
          url: `favorite/${favorite_id}`,
          credentials: 'include',
        };
      },
    }),
  }),
});

export const {
  useGetAllFavoritesQuery,
  useAddToFavoritesMutation,
  useDeleteFromFavoritesMutation,
  useGetFavoriteByIdQuery,
} = favoritesApi;
