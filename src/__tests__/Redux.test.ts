import {rootReducer} from "@reduxjs/toolkit/src/tests/injectableCombineReducers.example";
import {rootActions} from "@/store/rootActions";
import {cartReducer} from "@/store/cart/cart.slice";

const productItem = {
    id: 1,
    name: "Product",
    description: "Description of product"
}
const initialState = {items: []}
describe("cartSlice", () => {
    it("should return default state when passed an empty action", () => {
       const result =  cartReducer(undefined, {type: ""})

        expect(result).toEqual(initialState)
    })

    it("should add new item with 'addItem' action", () => {
        const action =  {type: rootActions.addItem.type, payload: productItem}
        const result = cartReducer(initialState, action)
        expect(result).toEqual({items: [{...productItem, quantity: 1}]})
    })

    it("should remove item if it exists with 'removeItem' action", () => {
        const action = {type: rootActions.removeItem.type, payload: productItem}
        const result = cartReducer({items: [productItem]}, action)
        expect(result).toEqual(initialState)
    })
})