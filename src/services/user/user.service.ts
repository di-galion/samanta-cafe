import {instance} from "@/api/api.interceptors";

export const UserService = {
    getProfile: async () => {
        return await instance({
            method: "GET",
            url: "/user/profile",
        })
    }
}