import { createSlice } from "@reduxjs/toolkit"

const darkModeSlice = createSlice({
    name: 'darkMode',
    initialState: { 
        darkModeEnabled: false, 
    },
    reducers: {
        setDarkModeEnabled: (state, action) => {
            state.darkModeEnabled = action.payload;
        },
    },
});

export const { setDarkModeEnabled } = darkModeSlice.actions
export default darkModeSlice.reducer
export const selectDarkModeEnabled = (state) => state.darkMode.darkModeEnabled
