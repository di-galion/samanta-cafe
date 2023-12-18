import {useQuery} from "@tanstack/react-query";
import {GET_ALL_ORDERS} from "@/constants/query-keys.constants";
import {PER_PAGE} from "@/constants/page.contants";
import {OrderService} from "@/services/order/order.service";
import {NO_FILTER} from "@/constants/order-status.constants";
import {IGetAllCategory} from "@/types/category.types";

export const useGetOrders = (
    {
        sort = "asc",
        filterSearch = NO_FILTER,
        page = 1,
        perPage = PER_PAGE,
        filterStatus
    }: IGetAllCategory )=> {
    console.log("USE_GET_ORDERS", filterStatus, filterSearch)
    const {data, isLoading} = useQuery({
        queryKey: [GET_ALL_ORDERS, filterSearch, filterStatus, sort, page, perPage],
        queryFn: () => OrderService.findAll({sort, page, filterStatus, filterSearch, perPage}),
        select: ({data}) => data
    })
    return {data, isLoading}
}