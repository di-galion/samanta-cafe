import {PRODUCTS_TEST} from "@/components/screens/product/__tests__/constants";
import {EnumOrderStatus} from "@/components/screens/dashboard-order/orders-catalog-item/types/types";


export const SAILS_TEST = [
    {
        id: 1,
        name: "Sail",
        slug: "Sail",
        price: 124,
        quantity: 1,
        images: ["http://local"],
        orderId: 1,
        productId: 1,
        product: PRODUCTS_TEST[0]
    }
]

export const ORDERS_TEST = [
    {
        id: 1,
        name: "Dima",
        tel: 89148508355,
        email: "dima@mail.ru",
        street: "Garlanovo",
        house: 234,
        room: 154,
        sails: SAILS_TEST,
        status: EnumOrderStatus.NOT_CONFIRMED,
        total: 1245,
        entrance: 2,
        key: "#1245",
        floor: 12,
        deliveryDate: "",
        deliveryTime: "",
        cafeName: "Samanta",
        comment: 'Some comment'
    }
]