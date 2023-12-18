export enum EnumOrderType {
    DELIVERY = "Доставка",
    FROM_CAFE = "Заберу из ресторана"
}

export enum EnumDeliveryTime {
    CLOSEST = 'В ближайшее время',
    TO_ANOTHER = 'К указанному времени'
}

export interface IFormDelivery  extends IForm {
    street: string,
    house: string,
    entrance: string,
    floor: string,
    room: string,
    key: string,
    comment: string,
}

export interface IForm {
    name: string,
    email: string,
    tel: string,
    deliveryDate: string,
    deliveryTime: string
    cafeName: string,
}
