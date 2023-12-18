import {IProduct} from "@/types/product.types";
import {EnumDeliveryTime, EnumOrderType, IForm} from "@/components/screens/order/types";
import {ISail} from "@/types/order.types";

export const createOrderRequest = (
    data: IForm,
    items: IProduct[],
    total: number,
    orderType: EnumOrderType) => {

    const products: ISail = items.map(item => ({
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        productId: item.id
    }))
    return  {
        ...data,
        products: products,
        userId: 1,
        // TEST
        cafeName: "Samanta",
        deliveryVariant: orderType,
        total: total
    }
}