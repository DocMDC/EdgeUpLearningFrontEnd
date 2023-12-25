import { apiSlice } from "../api/apiSlice";

export const aiApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        aiChat: builder.mutation({
            query: message => ({
                url: '/ai',
                method: 'POST',
                body: {...message} 
            })
        }),
    })
})

export const {
    useAiChatMutation,
} = aiApiSlice