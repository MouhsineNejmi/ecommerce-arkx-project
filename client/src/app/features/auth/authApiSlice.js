import { apiSlice } from "../../api/authApi";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: ({ username, password, accountType }) => ({
                url: 'login',
                method: 'POST',
                body: { username, password, accountType }
            })
        }),
    })
})

export const {
    useLoginMutation
} = authApiSlice