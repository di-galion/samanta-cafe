import {instance} from "@/api/api.interceptors";
import {register} from "@/store/user/user.actions";
import {ICategory, IGetAllCategory} from "@/types/category.types";
import {NO_FILTER} from "@/constants/order-status.constants";
import {PER_PAGE} from "@/constants/page.contants";

export const CategoryService = {
    getAll: async (
        {
            filterSearch = NO_FILTER,
            sort = "asc",
            page = 1,
            perPage = PER_PAGE
        }: IGetAllCategory) => {

        return  await instance({
            method: "GET",
            url: `category/${filterSearch}/${sort}/${page}/${perPage}`
        })
    },

    getBySlug: async (slug: string) => {
        return  await instance({
            method: "GET",
            url: `/category/by-slug/${slug}`
        })
    },

    create: async (data: Partial<ICategory>) => {
        return  await instance({
            method: "POST",
            url: `/category`,
            data: data
        })
    },

    update: async (id: number, data: Partial<ICategory>) => {
        return  await instance({
            method: "PATCH",
            url: `/category/${id}`,
            data: data
        })
    },

    getById: (id: number | string) => {
        return instance({
            method: "GET",
            url: `category/${id}`
        })
    }
}