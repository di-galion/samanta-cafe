import axios from "axios";
import {getAccessToken, removeFromStorage} from "@/services/auth/auth.helper";
import {errorCatch} from "@/api/api.helper";
import {AuthService} from "@/services/auth/auth.service";

const options = {
    baseURL: "http://localhost:3002/api/",
    headers: {'Content-Type': "application/json"}
}


export const instance = axios.create(options)

instance.interceptors.request.use((config) => {
    const token = getAccessToken()
    config.headers.Authorization = token ? `Bearer ${token}` : null
    return config
    }
)

instance.interceptors.response.use(
    config => config,
    async error => {
        const originalRequest = error.config

        if (
            (error?.response?.status === 401 ||
                errorCatch(error) === 'jwt expired' ||
                errorCatch(error) === 'jwt must be provided') &&
            error.config &&
            !error.config._isRetry
        ) {
            originalRequest._isRetry = true
            try {
                await AuthService.getNewTokens()
                return instance.request(originalRequest)
            } catch (error) {
                if (errorCatch(error) === 'jwt expired') await AuthService.logout()
            }
        }

        throw error
    }
)
