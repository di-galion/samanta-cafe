import {IProduct} from "@/types/product.types";

export interface ISail {
    id: number,
    name: string,
    price: number,
    quantity: number,
    productId: number,
    product: IProduct,
    orderId: number
}

export interface ISailCreate {
    id: number,
    name: string,
    price: number,
    quantity: number,
    productId: number,
    orderId: number
}