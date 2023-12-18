import {createSlice, current, PayloadAction} from "@reduxjs/toolkit";
import {IProduct} from "@/types/product.types";
import {ICart} from "@/store/cart/cart.types";
import * as querystring from "querystring";


const initialState: {items: ICart[]} = {
    items: []
}


const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addItem: (state, action: PayloadAction<IProduct>) => {

            const isExist = state.items.some((item) => {
                if (item.id === action.payload.id) return true
            })

            if (!isExist) {
                state.items.push({...action.payload, quantity: 1})
            }
        },

        removeItem: (state, action) => {
            const items: ICart[] = state.items.filter((item: ICart) => item.id !== action.payload.id)

            state.items = items
        },

        removeAll: (state) => {
            state.items = []
        },

        riseQuantity: (state, action) => {
            state.items = state.items.map(item => {
                if (item.id === action.payload.id) {
                    console.log(item.id, action.payload.id, item.quantity++)
                    return {...item, quantity:  item.quantity++}
                }
                return item
            })

        },
        decreaseQuantity: (state, action) => {
            state.items = state.items.map(item => {
                if (item.id === action.payload.id) {
                    console.log(item.id, action.payload.id, item.quantity--)
                    return {...item, quantity: item.quantity < 1 ? 0 : item.quantity--}
                }
                return item
            })
        }

    }
})

export const cartReducer = cartSlice.reducer

export default cartSlice
