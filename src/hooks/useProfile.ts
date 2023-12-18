import {useQuery} from "@tanstack/react-query";
import {CategoryService} from "@/services/category/category.service";
import {AuthService} from "@/services/auth/auth.service";
import {useActions} from "@/hooks/useActions";
import {useAuth} from "@/hooks/useAuth";
import {UserService} from "@/services/user/user.service";
import {is} from "immutable";
import {GET_PROFILE} from "@/constants/query-keys.constants";

export const useProfile = () => {
    const {user} = useAuth()

    // console.log(user)

    const {data} = useQuery({
        queryKey: [GET_PROFILE],
        queryFn: () => UserService.getProfile(),
        select: ({data}) => data,
        enabled: !!user
    })

    // console.log(data)

    return {profile: data || {}}
}