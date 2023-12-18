import {IProduct} from "@/types/product.types";

export interface ICart extends IProduct{
    quantity: number
}