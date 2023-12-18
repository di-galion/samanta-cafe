import {useTypedSelector} from "@/hooks/useTypedSelector";
import {ICart} from "@/store/cart/cart.types";


// export const cartSelector = state => state.cart
export const useCart = () => {
    const {items} = useTypedSelector( state => state.cart)

    const total = items.reduce((acc, item: ICart) => {
        return acc = acc + +item.price * item.quantity
    }, 0)

    return {items, total}
}