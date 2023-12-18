import {ISail} from "@/types/sail.types";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {GET_ALL_ORDERS, UPDATE_SAIL} from "@/constants/query-keys.constants";
import {SailService} from "@/services/sail/sail.service";

export const useUpdateSailMutation = (sail: ISail, editItem: Partial<ISail>) => {
    const queryCache = useQueryClient()
    const {mutate} = useMutation(
        [UPDATE_SAIL, sail.id],
        {
            mutationFn: () => SailService.update(editItem, sail.id),
            onSuccess: () => queryCache.invalidateQueries([GET_ALL_ORDERS])
        }
    )
    return mutate
}