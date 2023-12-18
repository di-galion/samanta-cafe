import {IOrderResponse} from "@/types/order.types";
import {IProduct} from "@/types/product.types";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {GET_ALL_ORDERS, UPDATE_ORDER} from "@/constants/query-keys.constants";
import {OrderService} from "@/services/order/order.service";

export const useUpdateOrderMutationHook = (order: IOrderResponse, editItem: Partial<IProduct>) => {
    const queryCache = useQueryClient()
    const {mutate} = useMutation(
        [UPDATE_ORDER, order.id],
        () => OrderService.update(order.id, editItem),
        {
            onSuccess: () => queryCache.invalidateQueries([GET_ALL_ORDERS])
        }
    )
    return mutate
}
