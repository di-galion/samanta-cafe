import Cookies from "js-cookie";
import {ACCESS_TOKEN, REFRESH_TOKEN} from "@/constants/token.constants";
import {IAuthResponse, ITokens} from "@/types/auth.types";

export const saveToStorage = (data: IAuthResponse) => {
    Cookies.set(ACCESS_TOKEN, data.accessToken)
    Cookies.set(REFRESH_TOKEN, data.refreshToken)
    localStorage.setItem("user", JSON.stringify(data.user))
}

export const removeFromStorage = () => {
    Cookies.remove(ACCESS_TOKEN)
    Cookies.remove(REFRESH_TOKEN)
    localStorage.removeItem("user")
}

export const getAccessToken = () => {
    return Cookies.get(ACCESS_TOKEN)
}

export const getUserFromStorage = () => {
    if (typeof window !== 'undefined') {
        return JSON.parse(localStorage.getItem("user") || "{}")
    }

}

