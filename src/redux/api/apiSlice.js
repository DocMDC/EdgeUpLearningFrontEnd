import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { setAuth, logOut } from "../slices/authSlice"

const baseQuery = fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/v1",
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.token
        if (token) {
            headers.set("authorization", `Bearer ${token}`)
        }
        return headers
    }
})

const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions)

    if (result?.error?.originalStatus === 403) {
        // send refresh token to get new access token 
        const refreshResult = await baseQuery('/refresh', api, extraOptions)
        if (refreshResult?.data) {
            const user = api.getState().auth.email
            // store the new token 
            api.dispatch(setAuth({ ...refreshResult.data, user }))
            // retry the original query with new access token 
            result = await baseQuery(args, api, extraOptions)
        } else {
            api.dispatch(logOut())
        }
    }

    return result
}

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: builder => ({})
})

/*
export const qbankApi = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({baseUrl: "http://localhost:5000/api/v1"}),
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (data) => ({
                url: "/register",
                method: 'POST',
                body: data
            })
        }),
        login: builder.mutation({
            query: (data) => ({
                url: "/login",
                method: 'POST',
                body: data
            })
        }),
    }),
})

export const { useRegisterMutation, useLoginMutation } = qbankApi */