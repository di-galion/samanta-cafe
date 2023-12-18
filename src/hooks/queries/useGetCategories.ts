import {useQuery} from "@tanstack/react-query";
import {CategoryService} from "@/services/category/category.service";
import {IUseGetCategories} from "@/hooks/queries/types";
import {IGetAllCategory} from "@/types/category.types";
import {NO_FILTER} from "@/constants/order-status.constants";
import {PER_PAGE} from "@/constants/page.contants";
import {GET_ALL_CATEGORIES} from "@/constants/query-keys.constants";
import {EnumSort} from "@/types/enums";

export const useGetCategories = (d: IGetAllCategory): IUseGetCategories => {
    const {
        filterSearch = NO_FILTER,
            page = 1,
            perPage = PER_PAGE,
            sort = EnumSort.ASC
    } = d

    const {data, isLoading} = useQuery({
        queryKey: [GET_ALL_CATEGORIES, filterSearch, page, perPage, sort],
        queryFn: () => CategoryService.getAll({filterSearch, sort, page, perPage}),
        select: ({data}) => data
    })
    return {data, isLoading}
}