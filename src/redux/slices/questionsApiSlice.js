import { apiSlice } from "../api/apiSlice";

export const questionsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        addQuestion: builder.mutation({
            query: questionInformation => ({
                url: '/add-question',
                method: 'POST',
                body: { ...questionInformation } 
            })
        }),
        getQuestions: builder.query({
            query: () => "/get-questions", 
        }),
        fetchQuestionById: builder.query({
            query: (id) => ({
                url: `/get-question/${id}`,
                method: 'GET',
            }) 
        }),
        editQuestion: builder.mutation({
            query: questionInformation => ({
                url: '/edit-question',
                method: 'PATCH',
                body: { ...questionInformation } 
            })
        }),
        deleteQuestion: builder.mutation({
            query: (id) => ({
                url: `/delete-question/${id}`,
                method: 'DELETE',
            })
        }),
        filterQuestions: builder.query({
            query: () => ({
                url: `/filter-questions`,
                method: 'GET',
            })
        }),
        prepareQuestions: builder.mutation({
            query: questionInformation => ({
                url: '/prepare-questions',
                method: 'PATCH',
                body: { ...questionInformation } 
            })
        }),
        resetAccount: builder.mutation({
            query: () => ({
                url: '/reset-account',
                method: 'PATCH',
            })
        }),
    })
})

export const {
    useAddQuestionMutation,
    useGetQuestionsQuery,
    useLazyFetchQuestionByIdQuery,
    useEditQuestionMutation,
    useDeleteQuestionMutation,
    useFilterQuestionsQuery,
    usePrepareQuestionsMutation,
    useResetAccountMutation
} = questionsApiSlice