import { apiSlice } from "../api/apiSlice";

export const accountApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        resetAccount: builder.mutation({
            query: () => ({
                url: '/reset-account',
                method: 'PATCH',
            })
        }),
    })
})

export const {
    useResetAccountMutation
} = accountApiSlice