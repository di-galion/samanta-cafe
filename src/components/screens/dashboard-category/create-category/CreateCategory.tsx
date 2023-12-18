"use client"

import {ChangeEvent, FC, useRef, useState} from "react";
import {useGetCategories} from "@/hooks/queries/useGetCategories";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {ProductService} from "@/services/product/product.service";
import FormData from "form-data";
import {CATEGORY_ARRAY_OF_HEAD, PRODUCT_ARRAY_OF_HEAD} from "@/constants/head.constants";
import EditFormWrapper from "@/components/ui/admin/edit-form-wrapper/EditFormWrapper";
import OptionsWrapper from "@/components/ui/admin/options-wrapper/OptionsWrapper";
import InputsSectionWrapper from "@/components/ui/admin/inputs-section-wrapper/InputsSectionWrapper";
import Select from "@/components/ui/select/Select";
import FileLoader from "@/components/ui/admin/file-loader/FileLoader";
import {CategoryService} from "@/services/category/category.service";
import {ICreate} from "@/components/screens/dashboard-product/create-product/types";

const CreateCategory: FC<ICreate> = ({setIsOpen}) => {
    const [isEditing, setIsEditing] = useState(true)
    const [editItem, setEditItem] = useState({})

    const form = useRef(null)

    const queryCache = useQueryClient()

    const {mutate} = useMutation(
        [`create category`],
        () => CategoryService.create(editItem),
        {
            onSuccess: () => queryCache.invalidateQueries(["get all categories"])
        }
    )
    const onSubmit = (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault()

        const form = new FormData(e.target)

        if (form.get(CATEGORY_ARRAY_OF_HEAD[0]) === null) return

        const obj = {
            name: form.get(CATEGORY_ARRAY_OF_HEAD[0]),
            slug: form.get(CATEGORY_ARRAY_OF_HEAD[0]),
        }
        // console.log("OBJ", obj)
        setEditItem(obj)
        // console.log(editItem)
        setIsOpen(false)
        mutate()
    }
    return (
        <EditFormWrapper onSubmit={(e) => onSubmit(e)} >
            <form ref={form} onSubmit={(e: ChangeEvent<HTMLFormElement>) => onSubmit(e)}>
                <OptionsWrapper
                    setIsEditing={setIsEditing}
                    isEditing={isEditing}
                >

                </OptionsWrapper>

                <InputsSectionWrapper
                    isEditing={isEditing}
                    arrayOfValue={["", ""]}
                    arrayOfHead={CATEGORY_ARRAY_OF_HEAD}
                />
            </form>
        </EditFormWrapper>
    )
}

export default CreateCategory
