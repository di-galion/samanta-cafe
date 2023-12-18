"use client"

import {useMemo, useState} from "react";
import {NO_FILTER} from "@/constants/order-status.constants";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {OrderService} from "@/services/order/order.service";
import styles from "./styles.module.scss";
import Select from "@/components/ui/select/Select";
import {EnumOrderStatus} from "@/components/screens/dashboard-order/orders-catalog-item/types/types";
import {IOrderResponse} from "@/types/order.types";
import OrdersCatalogItem from "@/components/screens/dashboard-order/orders-catalog-item/OrdersCatalogItem";
import {BsFillArrowLeftSquareFill, BsFillArrowRightSquareFill} from "react-icons/bs";
import {ProductService} from "@/services/product/product.service";
import Pagination from "@/components/ui/admin/pagination/Pagination";
import ProductCatalogItem from "@/components/screens/dashboard-product/product-catalog-item/ProductCatalogItem";
import {IProduct} from "@/types/product.types";
import Button from "@/components/ui/button/Button";
import CreateProduct from "@/components/screens/dashboard-product/create-product/CreateProduct";
import Input from "@/components/ui/input/Input";
import InputsSectionWrapper from "@/components/ui/admin/inputs-section-wrapper/InputsSectionWrapper";
import FilterWrapper from "@/components/ui/admin/filter-wrapper/FilterWrapper";
import {useGetCategories} from "@/hooks/queries/useGetCategories";
import {ICategory} from "@/types/category.types";
import Loader from "@/components/ui/loader/Loader";
import {GET_ALL_PRODUCTS} from "@/constants/query-keys.constants";
import {PER_PAGE} from "@/constants/page.contants";

const ProductCatalog = () => {
    const [sort, setSort] = useState()
    const [page, setPage] = useState(1)
    const [filterSearch, setFilterSearch] = useState(NO_FILTER)
    const [filterCategory, setFilterCategory] = useState(NO_FILTER)
    const [addNewProduct, setAddNewProduct] = useState(false)

    const {data, isLoading} = useQuery({
        queryKey: [GET_ALL_PRODUCTS, sort, page, filterCategory, filterSearch],
        queryFn: () => ProductService.getAll({sort, filterCategory, filterSearch, page, perPage: 1}),
        select: ({data}) => data
    })


    const queryCache = useQueryClient()
    const {mutate, isLoading: getAllProductsMutationIsLoading} = useMutation(
        [GET_ALL_PRODUCTS],
        () => ProductService.getAll({sort, filterCategory, filterSearch, page, perPage: PER_PAGE}),
        {
            onSuccess: () => queryCache.invalidateQueries([GET_ALL_PRODUCTS])
        }
    )

    const {data: categories, isLoading: isLoadingCategories} = useGetCategories({})

    return (
        <div className={styles.catalog}>
            <FilterWrapper>
                <div className={styles.select}>
                    {categories && !isLoadingCategories &&
                        <Select
                            onClick={(value) => {
                                setFilterCategory(value)
                                 mutate()
                            }}
                            currentValue={NO_FILTER}
                        >
                            <li>{NO_FILTER}</li>
                            {categories.map((category) => {
                                return <li key={category.id}>{category.name}</li>
                            })}
                        </Select>}
                </div>
                <Input
                    onChange={(e) => {
                        const value = e.target.value.trim().length > 0 ? e.target.value : NO_FILTER
                        setFilterSearch(value)
                        mutate()
                    }}
                    placeholder={"Search"}
                />
                <Button
                    onClick={() => setAddNewProduct(!addNewProduct)}
                >
                    Add new product
                </Button>
            </FilterWrapper>

            <ul>
                {addNewProduct &&
                    <CreateProduct setIsOpen={(value) => setAddNewProduct(value)}  />
                }
                {data && !isLoading && !getAllProductsMutationIsLoading ? data.map((item: IProduct) => {
                    return (
                        <ProductCatalogItem item={item} key={item.id} />
                    )
                }):
                    <Loader />
                }
            </ul>

            <Pagination
                page={page}
                onClickLeft={() => setPage(page === 1 ? 1 : page -1)}
                onClickRight={() => setPage( page + 1)}
            />
        </div>
    )
}

export default ProductCatalog