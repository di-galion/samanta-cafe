import {userReducer, userSlice} from "@/store/user/user.slice";
import {register} from "@/store/user/user.actions";
import {tree} from "next/dist/build/webpack/loaders/next-route-loader/templates/app-page";
import {rootActions} from "@/store/rootActions";

const initialState = {
    user: null,
    isLoading: false
}

const payloadUser = {user: {name: "Dima", email: 'test@mail.com'}}

const stateFulfilled = {
    ...payloadUser,
    isLoading: false
}
describe("userSlice extra reducers ", () => {

    it("should change isLoading to true with 'register.pending' action", () => {
        const state = userReducer(initialState, register.pending())
        expect(state.isLoading).toBe(true)
    })

    it("should change isLoading to false and user to null with 'register.rejected' action", () => {
        const state = userReducer(initialState, register.rejected())
        expect(state).toBe(initialState)
    })

    it("should change isLoading to false and user to user with 'register.fulfilled' action", () => {
        const state = userReducer(initialState, register.fulfilled(payloadUser))
        expect(state).toEqual(stateFulfilled)
    })
})