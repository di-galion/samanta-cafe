import {ADMIN_URL, AUTH_URL, CATEGORY_URL, ORDER_URL, PRODUCT_URL, USER_URL} from "@/constants/url.constants";

export const getAdminUrl = (part: string) => {
    return `${ADMIN_URL}${part[0] === "/" ? part : "/" + part}`
}

export const getProductUrl = (part: string) => {
    return `${PRODUCT_URL}${part[0] === "/" ? part : "/" + part}`
}

export const getOrderUrl = (part: string) => {
    return `${ORDER_URL}${part[0] === "/" ? part : "/" + part}`
}

export const getAuthUrl = (part: string) => {
    return `${AUTH_URL}${part[0] === "/" ? part : "/" + part}`
}

export const getUserUrl = (part: string) => {
    return `${USER_URL}${part[0] === "/" ? part : "/" + part}`
}

export const getCategoryUrl = (part: string) => {
    return `${CATEGORY_URL}${part[0] === "/" ? part : "/" + part}`
}

