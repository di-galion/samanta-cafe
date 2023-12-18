"use client"

import {OrderService} from "@/services/order/order.service";
import OrdersCatalogItem from "@/components/screens/dashboard-order/orders-catalog-item/OrdersCatalogItem";
import {IOrderResponse} from "@/types/order.types";
import styles from "./styles.module.scss";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import Select from "@/components/ui/select/Select";
import {useEffect, useState} from "react";
import {BsFillArrowLeftSquareFill, BsFillArrowRightSquareFill} from "react-icons/bs";
import {EnumOrderStatus} from "@/components/screens/dashboard-order/orders-catalog-item/types/types";
import {NO_FILTER} from "@/constants/order-status.constants";
import Pagination from "@/components/ui/admin/pagination/Pagination";
import FilterWrapper from "@/components/ui/admin/filter-wrapper/FilterWrapper";
import Loader from "@/components/ui/loader/Loader";
import {PER_PAGE} from "@/constants/page.contants";
import {useGetOrders} from "@/components/screens/dashboard-order/orders-catalog/useGetOrders.hook";
import Input from "@/components/ui/input/Input";
import {GET_ALL_CATEGORIES, GET_ALL_ORDERS} from "@/constants/query-keys.constants";
import {CategoryService} from "@/services/category/category.service";
import {QueryClient} from "@tanstack/query-core";

const OrdersCatalog = () => {
    const [filterStatus, setFilterStatus] = useState(NO_FILTER)
    const [page, setPage] = useState(1)
    const [filterSearch, setFilterSearch] = useState(NO_FILTER)

    const {data, isLoading} = useGetOrders({filterStatus, filterSearch, sort: "asc", perPage: 1, page})

    const queryCache = new QueryClient()
    const {mutate, isLoading: mutationIsLoading} = useMutation(
        [GET_ALL_ORDERS],
        () => OrderService.findAll({page, perPage: 1, filterSearch, filterStatus}),
        {
            onSuccess: () => queryCache.invalidateQueries([GET_ALL_ORDERS])
        }
    )

    // useEffect(() => {
    //     console.log("MUTATION")
    //     mutate()
    //
    // }, [filterStatus])


    return (
        <div className={styles.catalog}>
            <FilterWrapper>
                <Input
                    onChange={(e) => {
                        const value = e.target.value.trim().length > 0 ? e.target.value : NO_FILTER
                        setFilterSearch(value)
                        mutate()
                    }}
                    placeholder={"Search"}
                />
                <div className={styles.select}>
                    <Select  onClick={(value) => setFilterStatus(value)} currentValue={NO_FILTER}>
                        {Object.entries(EnumOrderStatus).map((value) => {
                            return <li data-testid={`select-item-${value[1]}-test`} key={value[1]}>{value[1]}</li>})}
                        <li>{NO_FILTER}</li>
                    </Select>
                </div>
            </FilterWrapper>
            <ul>
                {data && !isLoading && !mutationIsLoading ? data.map((item: IOrderResponse) => {
                    return <OrdersCatalogItem key={item.id} order={item} />
                }) :
                    <Loader />
                }
            </ul>
            <Pagination
                page={page}
                onClickLeft={() => setPage(page === 1 ? 1 : page -1)}
                onClickRight={() => setPage(page + 1)}
            />
        </div>
    )
}

export default OrdersCatalog