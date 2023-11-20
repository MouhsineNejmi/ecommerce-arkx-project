import { apiSlice } from './api';

export const productsApi = apiSlice.injectEndpoints({
    tagTypes: ['Products'],
    endpoints: (builder) => ({
        // ? Query: Get All Products
        getAllProducts: builder.query({
            query() {
                return {
                    url: 'products',
                    credentials: 'include',
                };
            },
            providesTags: (result) =>
                result
                    ? [
                          ...result.map(({ id }) => ({
                              type: 'Products',
                              id,
                          })),
                          { type: 'Products', id: 'LIST' },
                      ]
                    : [{ type: 'Products', id: 'LIST' }],
            // ? Transform the result to prevent nested data
            transformResponse: (response) => response.data,
        }),
        // ? Query: Get a single product
        getProductById: builder.query({
            query(id) {
                return {
                    url: `products/${id}`,
                    credentials: 'include',
                };
            },
            transformResponse: (response) => response.data,
            providesTags: (_result, _error, id) => [{ type: 'Products', id }],
        }),
        createProduct: builder.mutation({
            query(product) {
                return {
                    url: '/products',
                    method: 'POST',
                    credentials: 'include',
                    body: product,
                };
            },
            invalidatesTags: [{ type: 'Products', id: 'LIST' }],
            transformResponse: (response) => response.data,
        }),
        updateProduct: builder.mutation({
            query({ id, product }) {
                return {
                    url: `/products/${id}`,
                    method: 'PUT',
                    credentials: 'include',
                    body: product,
                };
            },
            invalidatesTags: (result, error, { id }) =>
                result
                    ? [
                          { type: 'Products', id },
                          { type: 'Products', id: 'LIST' },
                      ]
                    : [{ type: 'Products', id: 'LIST' }],
            transformResponse: (response) => response.data,
        }),
        deleteProduct: builder.mutation({
            query(id) {
                return {
                    url: `/products/${id}`,
                    method: 'Delete',
                    credentials: 'include',
                };
            },
            invalidatesTags: [{ type: 'Products', id: 'LIST' }],
        }),
    }),
});

export const {
    useGetAllProductsQuery,
    useGetProductByIdQuery,
    useCreateProductMutation,
    useDeleteProductMutation,
    useUpdateProductMutation,
} = productsApi;
