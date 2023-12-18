import {ChangeEvent, FC, useEffect, useRef, useState} from "react";
import {ISailCreate} from "@/types/sail.types";
import {getProductHeadValues} from "@/utils/get-head-values.utils";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {OrderService} from "@/services/order/order.service";
import {SailService} from "@/services/sail/sail.service";
import FormData from "form-data";
import {PRODUCT_ARRAY_OF_HEAD} from "@/constants/head.constants";
import styles from "./styles.module.scss";
import OptionsWrapper from "@/components/ui/admin/options-wrapper/OptionsWrapper";
import Select from "@/components/ui/select/Select";
import {EnumOrderStatus} from "@/components/screens/dashboard-order/orders-catalog-item/types/types";
import InputsSectionWrapper from "@/components/ui/admin/inputs-section-wrapper/InputsSectionWrapper";
import SailItem from "@/components/screens/dashboard-order/sail-item/SailItem";
import ProductList from "@/components/screens/dashboard-order/product-list/ProductList";
import Button from "@/components/ui/button/Button";
import EditFormWrapper from "@/components/ui/admin/edit-form-wrapper/EditFormWrapper";
import {IProduct} from "@/types/product.types";
import {ProductService} from "@/services/product/product.service";
import {MdCloudUpload} from "react-icons/md";
import Image from "next/image";
import FileLoader from "@/components/ui/admin/file-loader/FileLoader";
import {useGetCategories} from "@/hooks/queries/useGetCategories";
import {getUniqueValues} from "@/utils/get-unique-values";
import {current} from "@reduxjs/toolkit";

const ProductCatalogItem: FC<{item: IProduct}> = ({item}) => {
    const [isEditing, setIsEditing] = useState(false)
    const [editItem, setEditItem] = useState({})
    const [image, setImage ] = useState(item.images[0])
    const [categoryName, setCategoryName] = useState('')
    const [isPopupOpen, setIsPopupOpen] = useState(false)

    const form = useRef(null)

    const arrayOfValue =  getProductHeadValues(item)
    const queryCache = useQueryClient()

    const {data: categories, isLoading} = useGetCategories({})

    const {mutate} = useMutation(
        [`update product`, item.id],
        () => ProductService.update(item.id, editItem),
        {
            onSuccess: () => queryCache.invalidateQueries(["get all products"])
        }
    )


    const onSubmit = (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault()

        const form = new FormData(e.target)

        if (form.get(PRODUCT_ARRAY_OF_HEAD[0]) === null) return

        const obj = {
            name: form.get(PRODUCT_ARRAY_OF_HEAD[0]),
            description: form.get(PRODUCT_ARRAY_OF_HEAD[1]),
            price: +form.get(PRODUCT_ARRAY_OF_HEAD[2]),
            images: [image]
        }
        const result = getUniqueValues(item, obj)
        // console.log("RESULT", result)
        if (categoryName) result.category = {name: categoryName}

        setEditItem(result)
        // console.log("EDIT_ITEM", editItem)
        mutate()
    }

    return (
        <EditFormWrapper >
            <form ref={form} onSubmit={(e: ChangeEvent<HTMLFormElement>) => onSubmit(e)}>
                <OptionsWrapper onConfirmClick={setIsPopupOpen} setIsEditing={setIsEditing} isEditing={isEditing} >
                    <Select
                        onClick={(value) => {setCategoryName(value)}}
                        disabled={isEditing}
                        currentValue={item.category.name}
                    >
                        {categories.map((value) => {
                            return <li key={value.id}>{value.name}</li>
                        })}
                    </Select>
                </OptionsWrapper>

                <InputsSectionWrapper
                    isEditing={isEditing}
                    arrayOfValue={arrayOfValue}
                    arrayOfHead={PRODUCT_ARRAY_OF_HEAD}
                >
                    <FileLoader disabled={isEditing} image={image} setImage={setImage} />
                </InputsSectionWrapper>

            </form>
        </EditFormWrapper>
    )
}

export default ProductCatalogItem