"use client"

import Heading from "@/components/ui/heading/Heading";
import RatioInput from "@/components/ui/product/ratio-input/RatioInput";
import styles from './styles.module.scss'
import Input from "@/components/ui/input/Input";
import {FC, useState} from "react";
import {EnumDeliveryTime, EnumOrderType, IForm, IFormDelivery} from "@/components/screens/order/types";
import Ratio from "@/components/ui/ratio/Ratio";
import Button from "@/components/ui/button/Button";
import {useForm} from "react-hook-form";
import {useCart} from "@/hooks/useCart";
import {OrderService} from "@/services/order/order.service";
import {ISail} from "@/types/order.types";
import {createOrderRequest} from "@/utils/create-order-request";


const OrderPage: FC = () => {
    const [orderType, setOrderType] = useState<EnumOrderType>(EnumOrderType.DELIVERY)
    const [deliveryTime, setDeliveryTime] = useState<EnumDeliveryTime>(EnumDeliveryTime.CLOSEST)
    const {items, total} = useCart()

    const {
        register,
        handleSubmit,
        formState: {errors},
        reset
    } = useForm<IForm | IFormDelivery>({
        defaultValues: {deliveryDate: '', deliveryTime: ''},
        mode: 'onChange'
    })

    const onSubmit = async (data: IForm) => {
        const response = await OrderService.create(
            createOrderRequest(data, items, total, orderType, deliveryTime))
    }

    return (
        <div className={styles.order}>
            <Heading >Способ и адрес доставки</Heading>
            <div className={styles.ratio_container}>
                <RatioInput  variant={"order"} onClick={(value) => setOrderType(value)}>
                    <p data-testid={"ratio-delivery-test"} >{EnumOrderType.DELIVERY}</p>
                    <p data-testid={"ratio-cafe-test"}>{EnumOrderType.FROM_CAFE}</p>
                </RatioInput>
            </div>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className={styles.form}
            >
                <Input
                    testId={"input-name-test"}
                    {...register("name", {required: "Please enter your first name"})}
                    placeholder={"Имя"}
                />
                <Input
                    testId={"input-tel-test"}
                    {...register("tel", {required: "Введите свой телефон"})}
                    type={"tel"}
                    placeholder={"Номер телефона"}
                />
                <Input
                    {...register("email", {})}
                    placeholder={"E-mail"}
                />
                {orderType === EnumOrderType.DELIVERY ?
                    <>
                        <Input
                            testId={"input-street-test"}
                            {...register("street", {
                                required: "Please enter street"
                            })}
                            placeholder={"Улица"}
                        />
                        <Input
                            testId={"input-house-test"}
                            {...register("house", {
                                required: "Please enter house"
                            })}
                            placeholder={"Дом"}
                        />
                        <Input
                            testId={"input-entrance-test"}
                            {...register("entrance", {
                                required: "Please entrance street"
                            })}
                            placeholder={"Подьезд"}
                        />
                        <Input
                            testId={"input-room-test"}
                            {...register("room", {
                                required: "Please enter room"
                            })}
                            placeholder={"Квартира"}
                        />
                        <Input
                            testId={"input-floor-test"}
                            {...register("floor", {
                                required: "Please floor floor"
                            })}
                            placeholder={"Этаж"}
                        />
                        <Input
                            testId={"input-key-test"}
                            {...register("key", {})}
                            placeholder={"Код двери"}
                        />
                    </>
                    :
                    <>
                        <Input
                            testId={"input-cafe-test"}
                            {...register("cafeName", {})}
                            placeholder={"Пиццерия"}
                        />
                    </>
                }
                <Ratio
                    testId={"ratio-closest-test"}
                    checked={deliveryTime === EnumDeliveryTime.CLOSEST}
                    content={EnumDeliveryTime.CLOSEST}
                    onClick={(value) => setDeliveryTime(value)}
                    name={"delivery_choice"}
                />
                <Ratio
                    testId={"ratio-another-test"}
                    content={EnumDeliveryTime.TO_ANOTHER}
                    checked={deliveryTime === EnumDeliveryTime.TO_ANOTHER}
                    onClick={(value) => setDeliveryTime(value)}
                    name={"delivery_choice"}
                />
                {deliveryTime === EnumDeliveryTime.TO_ANOTHER && (
                    <div className={styles.delivery_time_input_container}>
                        <Input
                            testId={"input-date-test"}
                            type={"date"}
                            {...register("deliveryDate", {})}
                            placeholder={"Дата"} />
                        <Input
                            testId={"input-time-test"}
                            type={"time"}
                            {...register("deliveryTime", {})}
                            placeholder={"Время"} />
                    </div>
                )}
                <span>Комментарий к заказу</span>
                <Input
                    {...register("comment", {})}
                    placeholder={''}
                    type="text-aria"
                />
                <Button testId={"button-submit-test"} type={"submit"} variant={'red'}>Далее</Button>
            </form>
        </div>
    )
}

export default OrderPage