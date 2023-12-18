import {instance} from "@/api/api.interceptors";
import {ISail, ISailCreate} from "@/types/sail.types";

export const SailService = {
    create: async (data: ISailCreate) => {
        return await instance({
            url: '/sails',
            method: "POST",
            data: data
        })
    },

    remove: async (id: number) => {
        return await instance({
            url: `/sails/${id}`,
            method: "DELETE"
        })
    },

    update: async (data: Partial<ISail>, id: number) => {
        return await instance({
            url: `/sails/${id}`,
            method: "PATCH",
            data: data
        })
    },
}