import {ISail} from "@/types/sail.types";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {DELETE_SAIL} from "@/constants/query-keys.constants";
import {SailService} from "@/services/sail/sail.service";


export const useDeleteSailMutation = (sail: ISail) => {
    const queryCache = useQueryClient()
    const {mutate} = useMutation(
        [DELETE_SAIL, sail.id],
        {
            mutationFn: () => SailService.remove(sail.id),
            onSuccess: () => queryCache.invalidateQueries(["get all orders"])
        }
    )
    return mutate
}
