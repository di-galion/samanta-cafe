import {IOrderResponse} from "@/types/order.types";
import {IProduct} from "@/types/product.types";
import {ICategory} from "@/types/category.types";

export const getOrderHeadValues = (item: IOrderResponse) => {
    return [
        item.name,
        item.tel,
        item.street,
        item.house,
        item.entrance,
        item.floor,
        item.room,
        item.key,
        item.comment
    ]
}

export const getProductHeadValues = (item: IProduct) => {
    return [
        item.name,
       "sdfsdf sdfsd fsdfsdf sdfs d",
        item.price,
        item.category.name
    ]
}

export const getCategoryHeadValues = (item: ICategory) => {
    return [
        item.name,
        item.slug
    ]
}