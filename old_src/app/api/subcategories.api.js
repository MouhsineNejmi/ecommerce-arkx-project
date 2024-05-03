import { apiSlice } from './api';

export const subcategoriesApi = apiSlice.injectEndpoints({
    tagTypes: ['Subcategories'],
    endpoints: (builder) => ({
        getAllSubcategory: builder.query({
            query() {
                return {
                    url: `subcategories`,
                    credentials: 'include',
                };
            },
            providesTags: (result) =>
                result
                    ? [
                          ...result.map(({ id }) => ({
                              type: 'Subcategories',
                              id,
                          })),
                          { type: 'Subcategories', id: 'LIST' },
                      ]
                    : [{ type: 'Subcategories', id: 'LIST' }],
            // ? Transform the result to prevent nested data
            transformResponse: (response) => response.data,
        }),
        // ? Query: Get Subcategory by Id
        getSubcategoryById: builder.query({
            query(id) {
                return {
                    url: `subcategories/${id}`,
                    credentials: 'include',
                };
            },
            transformResponse: (response) => response.data,
            providesTags: (_result, _error, id) => [
                { type: 'Subcategories', id },
            ],
        }),
    }),
});

export const { useGetSubcategoryByIdQuery, useGetAllSubcategoryQuery } =
    subcategoriesApi;
