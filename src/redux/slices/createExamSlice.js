import { createSlice } from "@reduxjs/toolkit"

const createExamSlice = createSlice({
    name: 'createExam',
    initialState: { 
        tutorMode: false, 
        timedMode: false
    },
    reducers: {
        setCreateExamForm: (state, action) => {
            const { tutorMode, timedMode } = action.payload
            state.tutorMode = tutorMode;
            state.timedMode = timedMode;
        },
    },
});

export const { setCreateExamForm } = createExamSlice.actions
export default createExamSlice.reducer
export const selectTutorMode = (state) => state.createExam.tutorMode
export const selectTimedMode = (state) => state.createExam.timedMode
