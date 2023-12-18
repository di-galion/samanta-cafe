import {instance} from "@/api/api.interceptors";
import {IForm} from "@/components/screens/order/types";
import {IOrder, IOrderDelivery, IOrderResponse} from "@/types/order.types";
import {IGetAllCategory} from "@/types/category.types";


export const OrderService = {
    create: async (data: IOrder | IOrderDelivery) => {
        return await instance({
            url: "/order",
            method: "POST",
            data: data
        })
    },

    findAll: async (
        {
            sort = "asc", page, perPage, filterSearch, filterStatus
    }: IGetAllCategory) => {
        return await instance({
            url: `/order/${filterSearch}/${filterStatus}/${sort}/${page}/${perPage}`,
            method: "GET"
        })
    },

    update: async (id: string | number, data: Partial<IOrderResponse>) => {
        return await  instance({
            url: `/order/${id}`,
            method: "PATCH",
            data: data
        })
    }
}