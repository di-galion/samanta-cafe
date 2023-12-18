import {IForm, IFormDelivery} from "@/components/screens/order/types";
import {ISail} from "@/types/sail.types";

export interface IOrder extends IForm {
    products: ISail[],
    id: number
}

export interface IOrderDelivery extends IFormDelivery {
    sails: ISail[],
    id: number
}

export interface IOrderResponse extends IOrderDelivery {
    status: string,
    total: number
}
