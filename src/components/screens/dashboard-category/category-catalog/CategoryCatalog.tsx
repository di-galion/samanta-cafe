"use client"

import {useState} from "react";
import {NO_FILTER} from "@/constants/order-status.constants";
import {useMutation, useQuery} from "@tanstack/react-query";
import {ProductService} from "@/services/product/product.service";
import styles from "@/components/screens/dashboard-product/product-catalog/styles.module.scss";
import Select from "@/components/ui/select/Select";
import {EnumOrderStatus} from "@/components/screens/dashboard-order/orders-catalog-item/types/types";
import Button from "@/components/ui/button/Button";
import {IProduct} from "@/types/product.types";
import CreateProduct from "@/components/screens/dashboard-product/create-product/CreateProduct";
import ProductCatalogItem from "@/components/screens/dashboard-product/product-catalog-item/ProductCatalogItem";
import Pagination from "@/components/ui/admin/pagination/Pagination";
import {useGetCategories} from "@/hooks/queries/useGetCategories";
import InputsSectionWrapper from "@/components/ui/admin/inputs-section-wrapper/InputsSectionWrapper";
import CategoryCatalogItem from "@/components/screens/dashboard-category/category-catalog-item/CategoryCatalogItem";
import CreateCategory from "@/components/screens/dashboard-category/create-category/CreateCategory";
import FilterWrapper from "@/components/ui/admin/filter-wrapper/FilterWrapper";
import {ICategory} from "@/types/category.types";
import {Circles, ColorRing} from "react-loader-spinner"
import {CiRead} from "react-icons/ci";
import Loader from "@/components/ui/loader/Loader";
import Popup from "@/components/ui/popup/Popup";
import {PER_PAGE} from "@/constants/page.contants";
import Input from "@/components/ui/input/Input";
import {GET_ALL_CATEGORIES} from "@/constants/query-keys.constants";
import {CategoryService} from "@/services/category/category.service";
import {QueryClient} from "@tanstack/query-core";


const CategoryCatalog = () => {
    const [page, setPage] = useState(1)
    const [addNewCategory, setAddNewCategory] = useState(false)
    const [filterSearch, setFilterSearch] = useState(NO_FILTER)

    const {data, isLoading} = useGetCategories({page, perPage: 2, filterSearch})

    const queryCache = new QueryClient
    const {mutate} = useMutation(
        [GET_ALL_CATEGORIES],
        () => CategoryService.getAll({page, perPage: 2, filterSearch}),
        {
            onSuccess: () => queryCache.invalidateQueries([GET_ALL_CATEGORIES])
        }
    )
    return (
        <div className={styles.catalog}>
            <FilterWrapper >
                <Input
                    onChange={(e) => {
                        const value = e.target.value.trim().length > 0 ? e.target.value : NO_FILTER
                        setFilterSearch(value)
                        mutate()
                    }}
                    placeholder={"Search"}
                />
                <div className={styles.select}>

                </div>
                <Button onClick={() => setAddNewCategory(!addNewCategory)}>Add new category</Button>
            </FilterWrapper>
            <ul>
                {addNewCategory &&
                    <CreateCategory setIsOpen={setAddNewCategory} />
                }
                {data && !isLoading ?
                    data.map((item) => {
                    return <CategoryCatalogItem category={item} key={item.id} />
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

export default CategoryCatalog