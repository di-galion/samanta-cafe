"use client"

import {ChangeEvent, FC, useRef, useState} from "react";
import {getCategoryHeadValues} from "@/utils/get-head-values.utils";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import FormData from "form-data";
import {CATEGORY_ARRAY_OF_HEAD} from "@/constants/head.constants";
import OptionsWrapper from "@/components/ui/admin/options-wrapper/OptionsWrapper";
import InputsSectionWrapper from "@/components/ui/admin/inputs-section-wrapper/InputsSectionWrapper";
import EditFormWrapper from "@/components/ui/admin/edit-form-wrapper/EditFormWrapper";
import {useGetCategories} from "@/hooks/queries/useGetCategories";
import {getUniqueValues} from "@/utils/get-unique-values";
import {ICategory} from "@/types/category.types";
import {CategoryService} from "@/services/category/category.service";
import Popup from "@/components/ui/popup/Popup";
import {GET_ALL_CATEGORIES, UPDATE_CATEGORY} from "@/constants/query-keys.constants";
import {POPUP_ITEM_TEXT} from "@/constants/popup.constants";

const CategoryCatalogItem: FC<{category: ICategory}> = ({category}) => {
    const [isEditing, setIsEditing] = useState(false)
    const [editItem, setEditItem] = useState({})
    const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false)

    const form = useRef(null)

    const arrayOfValue =  getCategoryHeadValues(category)

    const queryCache = useQueryClient()
    const {data: categories, isLoading} = useGetCategories({})

    const {mutate} = useMutation(
        [UPDATE_CATEGORY, category.id],
        () => CategoryService.update(category.id, editItem),
        {
            onSuccess: () => queryCache.invalidateQueries([GET_ALL_CATEGORIES])
        }
    )

    const onSubmit = (formElement: HTMLFormElement | null) => {
        if (!formElement) return
        const form = new FormData(formElement)

        if (form.get(CATEGORY_ARRAY_OF_HEAD[0]) === null) return

        const obj = {
            name: form.get(CATEGORY_ARRAY_OF_HEAD[0]),
            slug: form.get(CATEGORY_ARRAY_OF_HEAD[1])
        }
        const result = getUniqueValues(category, obj)

        if (!Object.keys(result).length) return;
        setEditItem(result)
        mutate()
    }

    return (
        <EditFormWrapper  >
            <form ref={form} >
                <OptionsWrapper
                    setIsEditing={setIsEditing}
                    onConfirmClick={setIsPopupOpen}
                    isEditing={isEditing}
                />
                <InputsSectionWrapper
                    isEditing={isEditing}
                    arrayOfValue={arrayOfValue}
                    arrayOfHead={CATEGORY_ARRAY_OF_HEAD}
                />
            </form>
            {isPopupOpen &&
                <Popup
                    content={POPUP_ITEM_TEXT}
                    onClickAgreeHandler={(e: ChangeEvent<HTMLFormElement>) => {
                        setIsEditing(false)
                        onSubmit(form.current)
                    }}
                    onClickDisagreeHandler={() => {
                        setIsEditing(false)
                        if (form.current) form.current.reset()

                    }}
                    setIsOpen={setIsPopupOpen}
                /> }
        </EditFormWrapper>
    )
}

export default CategoryCatalogItem