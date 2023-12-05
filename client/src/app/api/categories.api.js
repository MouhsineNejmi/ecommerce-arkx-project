import { apiSlice } from './api';

export const categoriesApi = apiSlice.injectEndpoints({
  tagTypes: ['categories'],
  endpoints: (builder) => ({
    getAllCategories: builder.query({
      query() {
        return {
          url: `categories`,
          credentials: 'include',
        };
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({
                type: 'categories',
                id,
              })),
              { type: 'categories', id: 'LIST' },
            ]
          : [{ type: 'categories', id: 'LIST' }],
      // ? Transform the result to prevent nested data
      transformResponse: (response) => response.data,
    }),
    // ? Query: Get category by Id
    getCategoryById: builder.query({
      query(id) {
        return {
          url: `categories/${id}`,
          credentials: 'include',
        };
      },
      transformResponse: (response) => response.data,
      providesTags: (_result, _error, id) => [{ type: 'categories', id }],
    }),
  }),
});

export const { useGetCategoryByIdQuery, useGetAllCategoriesQuery } =
  categoriesApi;
