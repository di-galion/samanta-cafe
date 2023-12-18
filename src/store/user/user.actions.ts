import {createAsyncThunk} from "@reduxjs/toolkit";
import {AuthService} from "@/services/auth/auth.service";
import {ILoginRequest, IRegisterRequest} from "@/types/auth.types";
import {removeFromStorage} from "@/services/auth/auth.helper";


export const register = createAsyncThunk(
    'auth/register',
    async (data: IRegisterRequest, thunkAPI) => {
       try {
           return  await AuthService.register(data)
       } catch (e) {
           return thunkAPI.rejectWithValue(e)
       }
    }
)

export const login = createAsyncThunk(
    "auth/login",
    async (data: ILoginRequest, thunkAPI) => {
        try {
            return await AuthService.login(data)
        } catch (e) {
            return thunkAPI.rejectWithValue(e)
        }
    }
)

export const logout = createAsyncThunk(
    'auth/logout',
    async () => {
        removeFromStorage()
    }
)

