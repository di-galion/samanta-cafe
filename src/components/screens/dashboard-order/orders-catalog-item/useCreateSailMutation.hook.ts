import {IOrderResponse} from "@/types/order.types";
import {ISail} from "@/types/sail.types";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {CREATE_SAIL, GET_ALL_ORDERS} from "@/constants/query-keys.constants";
import {SailService} from "@/services/sail/sail.service";

export const useCreateSailMutation = (order: IOrderResponse, newSail: ISail) => {
    const queryCache = useQueryClient()
    const {mutate} = useMutation(
        [CREATE_SAIL, newSail?.name, order.id],
        () => SailService.create(newSail),
        {
            onSuccess: () => queryCache.invalidateQueries([GET_ALL_ORDERS])
        }
    )
    return mutate
}