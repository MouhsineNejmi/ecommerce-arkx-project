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
  }),
});

export const { useGetMyProfileDataQuery } = userApi;
