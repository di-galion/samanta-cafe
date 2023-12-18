import {instance} from "@/api/api.interceptors";
import {IGetAllProduct, IProduct, IProductCreate} from "@/types/product.types";
import {IOrderResponse} from "@/types/order.types";
import {NO_FILTER} from "@/constants/order-status.constants";

export const ProductService = {
    getAll: async (
        {
            filterCategory = NO_FILTER,
            filterSearch = NO_FILTER,
            sort = "asc",
            page = 1,
            perPage = 20

        }: IGetAllProduct
    ) => {
         return instance({
            method: "GET",
            url: `/product/${filterCategory}/${filterSearch}/${sort}/${page}/${perPage}`,
        })
    },
    getSimilar: async (id: string | number) => {
        return await instance({
            method: "GET",
            url: `product/similar/${id}`,
        })
    },

    getBySlug: async (slug: string) => {
        return await instance({
            method: "GET",
            url: `product/by-slug/${slug}`,
        })
    },

    create: async (data: IProductCreate) => {
            return await instance({
                method: "POST",
                url: "product/create",
                data: data
            })
    },

    update: async (id: string | number, data: Partial<IProduct>) => {
        return await  instance({
            url: `/product/${id}`,
            method: "PATCH",
            data: data
        })
    }
}