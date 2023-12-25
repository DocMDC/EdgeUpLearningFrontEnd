import { createSlice } from "@reduxjs/toolkit"

const modalSlice = createSlice({
    name: 'modal',
    initialState: { 
        endExamModal: false, 
    },
    reducers: {
        setEndExamModal: (state, action) => {
            state.endExamModal = action.payload;
        },
    },
});

export const { setEndExamModal } = modalSlice.actions
export default modalSlice.reducer
export const selectEndExamModal = (state) => state.modal.endExamModal
