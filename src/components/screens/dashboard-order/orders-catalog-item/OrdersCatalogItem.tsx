"use client"
import {ChangeEvent, FC, useEffect, useRef, useState} from "react";
import { IOrderResponse} from "@/types/order.types";
import styles from './styles.module.scss'
import Select from "@/components/ui/select/Select";
import {EnumOrderStatus} from "@/components/screens/dashboard-order/orders-catalog-item/types/types";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {OrderService} from "@/services/order/order.service";
import FormData from "form-data";
import {ORDER_ARRAY_OF_HEAD} from "@/constants/head.constants";
import {getOrderHeadValues} from "@/utils/get-head-values.utils";
import SailItem from "@/components/screens/dashboard-order/sail-item/SailItem";
import Button from "@/components/ui/button/Button";
import ProductList from "@/components/screens/dashboard-order/product-list/ProductList";
import {ISail, ISailCreate} from "@/types/sail.types";
import {SailService} from "@/services/sail/sail.service";
import OptionsWrapper from "@/components/ui/admin/options-wrapper/OptionsWrapper";
import InputsSectionWrapper from "@/components/ui/admin/inputs-section-wrapper/InputsSectionWrapper";
import EditFormWrapper from "@/components/ui/admin/edit-form-wrapper/EditFormWrapper";
import Popup from "@/components/ui/popup/Popup";
import {POPUP_ITEM_TEXT} from "@/constants/popup.constants";
import {CREATE_SAIL, GET_ALL_ORDERS, UPDATE_ORDER} from "@/constants/query-keys.constants";
import {IProduct} from "@/types/product.types";
import {useUpdateOrderMutationHook} from "@/components/screens/dashboard-order/orders-catalog-item/useUpdateOrderMutation.hook";
import {
    useCreateSailMutation
} from "@/components/screens/dashboard-order/orders-catalog-item/useCreateSailMutation.hook";



const OrdersCatalogItem: FC<{order: IOrderResponse}> = ({order}) => {
    const [isEditing, setIsEditing] = useState(false)
    const [editItem, setEditItem] = useState({})
    const [isProductListOpen, setIsProductListOpen] = useState(false)
    const [newSail, setNewSail] = useState<ISailCreate>()
    const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false)
    // Tp prevent use Effect during initial render
    const isMountedOrder = useRef(false);
    const isMountedSail = useRef(false);

    const form = useRef(null);

    const arrayOfValue = getOrderHeadValues(order)

    const mutate = useUpdateOrderMutationHook(order, editItem)
    const mutateSailCreate = useCreateSailMutation(order, newSail)
    useEffect(() => {
        if (isMountedOrder.current) mutate()
        else isMountedOrder.current = true
    }, [editItem])
    useEffect(() => {
        if (isMountedSail.current) mutateSailCreate()
        else isMountedSail.current = true

    }, [newSail])

    const onSubmit = (formElement: HTMLFormElement | null) => {

        if (!formElement) return;
        const form = new FormData(formElement as HTMLFormElement)

        if (form.get(ORDER_ARRAY_OF_HEAD[0]) === null) return
        setEditItem({
            name: form.get(ORDER_ARRAY_OF_HEAD[0]),
            tel: form.get(ORDER_ARRAY_OF_HEAD[1]),
            street: form.get(ORDER_ARRAY_OF_HEAD[2]),
            house: form.get(ORDER_ARRAY_OF_HEAD[3]),
            entrance: form.get(ORDER_ARRAY_OF_HEAD[4]),
            floor: form.get(ORDER_ARRAY_OF_HEAD[5]),
            room: form.get(ORDER_ARRAY_OF_HEAD[6]),
            key: form.get(ORDER_ARRAY_OF_HEAD[7]),
        })
        // if (Object.keys(editItem).length) mutate()
    }

    return (
        <EditFormWrapper >
            <form
                data-testid={"order-item-test"}
                ref={form}
                onSubmit={(e: ChangeEvent<HTMLFormElement>) => onSubmit(e)}
            >
                <OptionsWrapper
                    setIsEditing={setIsEditing}
                    isEditing={isEditing}
                    onConfirmClick={setIsPopupOpen}
                >
                    <Select
                        testId={"change-status-test"}
                        onClick={(value) => {
                            setEditItem({status: value})
                        }}
                        currentValue={order.status}
                    >
                        {Object.entries(EnumOrderStatus).map((value) => {
                            return <li data-testid={`select-item-${value[1]}-test`} key={value[1]}>{value[1]}</li>})}
                    </Select>
                </OptionsWrapper>

                <InputsSectionWrapper
                    isEditing={isEditing}
                    arrayOfValue={arrayOfValue}
                    arrayOfHead={ORDER_ARRAY_OF_HEAD}
                />

                <div className={styles.sails}>
                    {order.sails.map((sail) => {
                        return (<SailItem key={sail.id} sail={sail} />)
                    })}
                </div>

                {isProductListOpen &&
                    <ProductList
                        orderId={order.id}
                        setNewSailOnClick={(sail: ISailCreate) => {
                            setNewSail(sail)
                            if (newSail !== undefined) {
                                setIsProductListOpen(false)
                            }
                        }}
                    />
                }

                <div className={styles.button_add_sails}>
                    <Button
                        type={"button"}
                        testId={"button-add-sails-test"}
                        onClick={() => setIsProductListOpen(!isProductListOpen)}
                    >
                        Add sails
                    </Button>
                </div>

                <div className={styles.total}>{order.total}</div>

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
                    />
                }
            </form>
        </EditFormWrapper>

    )
}
export default OrdersCatalogItem
