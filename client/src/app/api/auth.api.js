import { logout } from '../features/user.slice';
import { apiSlice } from './api';
import { userApi } from './user.api';

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query(data) {
        return {
          url: 'auth/register',
          method: 'POST',
          body: data,
        };
      },
      invalidatesTags: [{ type: 'Users', id: 'LIST' }],
      transformResponse: (result) => result.data.user,
    }),
    loginUser: builder.mutation({
      query(data) {
        return {
          url: 'auth/login',
          method: 'POST',
          body: data,
          credentials: 'include',
        };
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            userApi.endpoints.getMyProfileData.initiate({
              data,
            })
          );
        } catch (error) {
          /* Empty */
        }
      },
    }),
    logoutUser: builder.mutation({
      query() {
        return {
          url: 'auth/logout',
          credentials: 'include',
        };
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(logout());
        } catch (error) {
          /* Empty */
        }
      },
    }),
  }),
});

export const {
  useLoginUserMutation,
  useCreateUserMutation,
  useLogoutUserMutation,
} = authApi;
