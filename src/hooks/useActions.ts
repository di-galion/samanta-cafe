import {bindActionCreators} from "redux";
import {useDispatch} from "react-redux";
import {rootActions} from "@/store/rootActions";
import {useMemo} from "react";

export const useActions = () => {
    const dispatch = useDispatch()

    return useMemo(() => bindActionCreators(rootActions, dispatch), [dispatch])
}