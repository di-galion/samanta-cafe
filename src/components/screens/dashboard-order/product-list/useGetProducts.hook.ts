import {useQuery} from "@tanstack/react-query";
import {GET_ALL_PRODUCTS} from "@/constants/query-keys.constants";
import {ProductService} from "@/services/product/product.service";

export const useGetProducts = () => {
    const {data, isLoading} = useQuery({
        queryKey: [GET_ALL_PRODUCTS],
        queryFn: () => ProductService.getAll({}),
        select: ({data}) => data
    })
    return {data, isLoading}
}