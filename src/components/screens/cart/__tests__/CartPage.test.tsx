import {renderWithProviders, setupStore} from "@/__tests__/helpers/renderTestApp";
import CartPage from "@/components/screens/cart/CartPage";
import {fireEvent, screen} from "@testing-library/react";
import {act} from "react-dom/test-utils";

const useCartResult = {
    items: [{name: "Product Well", price: 12, category: '3', quantity: 3, slug: "d", images: ["http://local"], id: 1}],
    total: 36
}

const mockedUseRouterPush = jest.fn()
jest.mock('next/navigation', () => ({
    useRouter: () => ({
        push: mockedUseRouterPush
    })
}))

describe("Cart page",  () => {

    afterEach(() => {
        jest.clearAllMocks()
    })

    beforeEach(() => {
        const component = renderWithProviders(<CartPage />, {
            preloadedState: {cart: {items: useCartResult.items,}}})
    })

    test("Cart page render", () => {
        const items = screen.getAllByTestId("cart-item")

        expect(screen.getByTestId("total").textContent).toBe(`${useCartResult.total} руб.`)
        expect(items.length).toBe(useCartResult.items.length)
    })

    test("Should router.push have been called", () => {
        act(() => {
            fireEvent.click(screen.getByTestId("button-submit-test"))
        })

        expect(mockedUseRouterPush).toHaveBeenCalledTimes(1)
    })

})