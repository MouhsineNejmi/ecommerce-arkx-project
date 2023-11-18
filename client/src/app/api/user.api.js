import { setUser } from '../features/user.slice';
import { apiSlice } from './api';

export const userApi = apiSlice.injectEndpoints({
  tagTypes: ['User'],
  endpoints: (builder) => ({
    getMyProfileData: builder.query({
      query() {
        return {
          url: 'users/profile',
          credentials: 'include',
        };
      },
      transformResponse: (result) => result.data.user,
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data: user } = await queryFulfilled;
          const { data } = await args;

          dispatch(setUser({ user: user, access_token: data.access_token }));
        } catch (error) {
          /* Empty */
        }
      },
    }),
    getAllUsers: builder.query({
      query: () => {
        return {
          url: 'users/',
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
                type: 'Users',
                id,
              })),
              { type: 'Users', id: 'LIST' },
            ]
          : [{ type: 'Users', id: 'LIST' }],
    }),
    getUserById: builder.query({
      query: (userId) => {
        return {
          url: `users/user/${userId}`,
          credentials: 'include',
        };
      },
      transformResponse: (result) => result.data,
      providesTags: (result, error, id) => [{ type: 'Users', id }],
    }),
    updateUser: builder.mutation({
      query: ({ userId, updatedUser }) => {
        console.log(userId, updatedUser);
        return {
          url: `users/user/${userId}`,
          method: 'PUT',
          body: updatedUser,
          credentials: 'include',
        };
      },
      invalidatesTags: ['User'],
    }),
  }),
});

export const {
  useGetMyProfileDataQuery,
  useGetAllUsersQuery,
  useGetUserByIdQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
} = userApi;
