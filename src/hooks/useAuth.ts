import {useSelector} from "react-redux";
import {TypeRootState} from "@/store/store";
import {IUser} from "@/types/user.types";
import {useTypedSelector} from "@/hooks/useTypedSelector";

export const useAuth = () => {
    return useTypedSelector(state => state.user)
}