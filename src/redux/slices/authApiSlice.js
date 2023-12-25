import { apiSlice } from "../api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: credentials => ({
                url: '/login',
                method: 'POST',
                body: { ...credentials }
            })
        }),
        register: builder.mutation({
            query: credentials => ({
                url: '/register',
                method: 'POST',
                body: { ...credentials }
            })
        }),
        logout: builder.query({
            query: () => "/logout"
        }),
        refresh: builder.query({
            query: () => "/refresh"
        }),
        forgot: builder.mutation({
            query: email => ({
                url: '/forgot',
                method: 'POST',
                body: {email}
            })
        }),
        reset: builder.mutation({
            query: paramId => ({
                url: '/reset',
                method: 'PATCH',
                body: {paramId}
            })
        }),
    })
})

export const {
    useLoginMutation,
    useRegisterMutation,
    useLazyLogoutQuery,
    useLazyRefreshQuery,
    useForgotMutation,
    useResetMutation,
} = authApiSlice