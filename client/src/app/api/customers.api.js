import { apiSlice } from './api';

export const customersApi = apiSlice.injectEndpoints({
  tagTypes: ['User'],
  endpoints: (builder) => ({
    getAllCustomers: builder.query({
      query: () => {
        return {
          url: 'customers',
          credentials: 'include',
        };
      },
      transformResponse: (result) => {
        return result.data;
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({
                type: 'Customers',
                id,
              })),
              { type: 'Customers', id: 'LIST' },
            ]
          : [{ type: 'Customers', id: 'LIST' }],
    }),
    getCustomerById: builder.query({
      query: (customerId) => {
        return {
          url: `customers/customer/${customerId}`,
          credentials: 'include',
        };
      },
      transformResponse: (result) => result.data,
      providesTags: (result, error, id) => [{ type: 'Customers', id }],
    }),
    updateCustomer: builder.mutation({
      query: ({ customerId, updatedCustomer }) => {
        console.log(customerId, updatedCustomer);
        return {
          url: `users/user/${customerId}`,
          method: 'PUT',
          body: updatedCustomer,
          credentials: 'include',
        };
      },
      invalidatesTags: ['Customers'],
    }),
    deleteCustomer: builder.mutation({
      query: (customerId) => {
        return {
          url: `customers/customer/${customerId}`,
          method: 'DELETE',
          credentials: 'include',
        };
      },
      invalidatesTags: ['Customers'],
    }),
  }),
});

export const {
  useGetAllCustomersQuery,
  useGetCustomerByIdQuery,
  useCreateCustomerMutation,
  useUpdateCustomerMutation,
  useDeleteCustomerMutation,
} = customersApi;
