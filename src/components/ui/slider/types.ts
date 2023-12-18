import {IProduct} from "@/types/product.types";

export interface ISlider {
    sliderWidth?: string
    isSwipeSlider?: boolean
    itemStylesExtention?: {}
    itemLength?: number
    sliderStylesExtention?: {}
    transformValue?: number
    data?: IProduct | string[]
}