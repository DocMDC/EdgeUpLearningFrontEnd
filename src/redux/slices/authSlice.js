import { createSlice } from "@reduxjs/toolkit"

const authSlice = createSlice({
    name: 'auth',
    initialState: { 
        email: null, 
        roles: null, 
        token: null, 
        persist: JSON.parse(localStorage.getItem("persist")) || false 
    },
    reducers: {
        setAuth: (state, action) => {
            const { email, roles, accessToken } = action.payload;
            state.email = email;
            state.roles = roles;
            state.token = accessToken;
        },
        logOut: (state, action) => {
            state.email = null
            state.token = null
        },
        setPersist: (state, action) => {
            state.persist = action.payload
            localStorage.setItem("persist", JSON.stringify(action.payload));
        }
    },
});


export const { setAuth, logOut, setPersist } = authSlice.actions
export default authSlice.reducer
export const selectCurrentUser = (state) => state.auth.email
export const selectCurrentRoles = (state) => state.auth.roles
export const selectCurrentToken = (state) => state.auth.token
export const selectPersist = (state) => state.auth.persist