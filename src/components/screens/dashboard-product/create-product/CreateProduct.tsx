"use client"
import EditFormWrapper from "@/components/ui/admin/edit-form-wrapper/EditFormWrapper";
import {ChangeEvent, FC, useRef, useState} from "react";
import OptionsWrapper from "@/components/ui/admin/options-wrapper/OptionsWrapper";
import InputsSectionWrapper from "@/components/ui/admin/inputs-section-wrapper/InputsSectionWrapper";
import {PRODUCT_ARRAY_OF_HEAD} from "@/constants/head.constants";
import Select from "@/components/ui/select/Select";
import FileLoader from "@/components/ui/admin/file-loader/FileLoader";
import FormData from "form-data";
import {getUniqueValues} from "@/utils/get-unique-values";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {ProductService} from "@/services/product/product.service";
import {ISailCreate} from "@/types/sail.types";
import {getProductHeadValues} from "@/utils/get-head-values.utils";
import {useGetCategories} from "@/hooks/queries/useGetCategories";
import {IProduct, IProductCreate} from "@/types/product.types";
import {ICreate, ICreateProduct} from "@/components/screens/dashboard-product/create-product/types";
import {CREATE_PRODUCT, GET_ALL_PRODUCTS} from "@/constants/query-keys.constants";

const CreateProduct: FC<ICreate> = ({setIsOpen}) => {
    const [isEditing, setIsEditing] = useState(true)
    const [editItem, setEditItem] = useState<IProductCreate | {}>({})
    const [image, setImage ] = useState()
    const [categoryName, setCategoryName] = useState('')
    const [isPopupOpen, setIsPopupOpen] = useState(false)

    const form = useRef(null)

    const {data: categories, isLoading} = useGetCategories({})

    const queryCache = useQueryClient()

    const {mutate} = useMutation(
        [CREATE_PRODUCT],
        () => ProductService.create(editItem),
        {
            onSuccess: () => queryCache.invalidateQueries([GET_ALL_PRODUCTS])
        }
    )
    const onSubmit = (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault()

        const form = new FormData(e.target)

        if (form.get(PRODUCT_ARRAY_OF_HEAD[0]) === null) return

        const obj = {
            name: form.get(PRODUCT_ARRAY_OF_HEAD[0]),
            slug: form.get(PRODUCT_ARRAY_OF_HEAD[0]),
            description: form.get(PRODUCT_ARRAY_OF_HEAD[1]),
            price: +form.get(PRODUCT_ARRAY_OF_HEAD[2]),
            images: [image],
            category: {name: categoryName}
        }
        setEditItem(obj)
        mutate()
        setIsOpen(false)
    }
    return (
        <EditFormWrapper >
            <form ref={form} onSubmit={(e: ChangeEvent<HTMLFormElement>) => onSubmit(e)}>
                <OptionsWrapper onConfirmClick={setIsPopupOpen} setIsEditing={setIsEditing} isEditing={isEditing} />

                <InputsSectionWrapper
                    isEditing={isEditing}
                    arrayOfValue={[""]}
                    arrayOfHead={PRODUCT_ARRAY_OF_HEAD}
                >
                    <Select
                        onClick={(value) => {setCategoryName(value)}}
                        disabled={true}
                        currentValue={categories[0].name}
                    >
                        {categories.map((value) => {
                            return <li key={value.id}>{value.name}</li>
                        })}
                    </Select>
                    <FileLoader disabled={isEditing} image={image} setImage={setImage} />
                </InputsSectionWrapper>

            </form>
        </EditFormWrapper>
    )
}

export default CreateProduct