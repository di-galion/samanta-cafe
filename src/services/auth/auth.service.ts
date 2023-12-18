import {instance} from "@/api/api.interceptors";
import { IAuthResponse, ILoginRequest, IRegisterRequest} from "@/types/auth.types";
import {IUser} from "@/types/user.types";
import {removeFromStorage, saveToStorage} from "@/services/auth/auth.helper";
import Cookies from "js-cookie";
import {REFRESH_TOKEN} from "@/constants/token.constants";

export const AuthService =  {
    register: async (data: IRegisterRequest) =>  {
        const response = await instance<any>({
            method: "POST",
            url: "/auth/register",
            data
        })

        if (response.data.accessToken) saveToStorage(response.data)

        return response.data
    },

    login: async (data: ILoginRequest) => {
        const response = await instance({
            method: "POST",
            url: "/auth/login",
            data
        })

        if (response.data.accessToken) saveToStorage(response.data)

        return response.data
    },

    logout: async () => {
        removeFromStorage()
    },

    async getNewTokens() {
        const refreshToken = Cookies.get(REFRESH_TOKEN)

        const response = await instance.post<string, { data: IAuthResponse }>(
            '/auth/tokens',
            { refreshToken }
        )

        console.log("GET_NEW_TOKENS", response.data)
        if (response.data.accessToken) saveToStorage(response.data)

        return response
    }
}