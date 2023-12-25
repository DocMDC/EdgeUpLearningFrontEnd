import { apiSlice } from "../api/apiSlice";

export const filesApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        uploadFiles: builder.mutation({
            query: formDataObj => ({
                url: '/multiple',
                method: 'POST',
                body: {formDataObj},
                FormData: true,
            })
        }),
    })
})

export const {
    useUploadFilesMutation,
} = filesApiSlice