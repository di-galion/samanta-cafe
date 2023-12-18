import {createSlice} from "@reduxjs/toolkit";
import {login, register} from "@/store/user/user.actions";
import {getUserFromStorage} from "@/services/auth/auth.helper";

const initialState = {
    user: getUserFromStorage(),
    isLoading: false,
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
            state.isLoading = true
        }).addCase(register.rejected, (state) => {
            state.isLoading = false
            state.user = null
        }).addCase(register.fulfilled, (state, action) => {
            state.isLoading = false
            state.user = action.payload.user
        })
            .addCase(login.pending, state => {
            state.isLoading = true
        }).addCase(login.rejected, state => {
            state.isLoading = false
            state.user = null
        }).addCase(login.fulfilled, (state, action) => {
            state.isLoading = false
            state.user = action.payload.user
        })
    }
})

export const userReducer = userSlice.reducer