
import OrderPage from "@/components/screens/order/OrderPage";
import {useCart} from "@/hooks/useCart";
import {act} from "react-dom/test-utils";
import {renderWithProviders, setupStore} from "@/__tests__/helpers/renderTestApp";
import {fireEvent, screen, waitFor} from "@testing-library/react";
import {OrderService} from "@/services/order/order.service";


const useCartResult = {
    items: [{name: "Product Well", price: 12, category: '3', quantity: 3, slug: "d", images: ["http://local"], id: 1}],
    total: 36
}


jest.mock("../../../../services/order/order.service")
const mockedCreateOrder = jest.spyOn(OrderService, "create")
describe("Order page",  () => {


    afterEach(() => {
        jest.clearAllMocks()
    })

     test("Should OrderService.create() have been called",  async () => {
         const component = renderWithProviders(<OrderPage />,  {
             preloadedState: {cart: {items: useCartResult.items}}
         })

         fireEvent.input(screen.getByTestId("input-name-test"), {
             target: {value: "Dmtriy"}
         })
         fireEvent.input(screen.getByTestId("input-tel-test"), {
             target: {value: "89148508355"}
         })
         fireEvent.input(screen.getByTestId("input-street-test"), {
             target: {value: "Gagarina"}
         })
         fireEvent.input(screen.getByTestId("input-house-test"), {
             target: {value: "2"}
         })
         fireEvent.input(screen.getByTestId("input-entrance-test"), {
             target: {value: "1"}
         })
         fireEvent.input(screen.getByTestId("input-floor-test"), {
             target: {value: "13"}
         })
         fireEvent.input(screen.getByTestId("input-room-test"), {
             target: {value: "132"}
         })
         fireEvent.input(screen.getByTestId("input-key-test"), {
             target: {value: "#1245"}
         })

         await act(() => {
             fireEvent.click(screen.getByTestId("button-submit-test"))
         })

         expect(OrderService.create).toHaveBeenCalledTimes(1)

    })

    test("Should OrderService.create() have not been called with empty required inputs",  async () => {
        const component = renderWithProviders(<OrderPage />,  {
            preloadedState: {cart: {items: useCartResult.items}}})

        await act(() => {
            fireEvent.click(screen.getByTestId("button-submit-test"))
        })

        expect(OrderService.create).toHaveBeenCalledTimes(0)

    })
    test("Should disappear street, entrance, floor, room, key inputs with click on 'ratio-cafe-test' ", () => {
        renderWithProviders(<OrderPage />)

        expect(screen.queryByTestId("input-cafe-test")).toBeNull()
        expect(screen.queryByTestId("input-street-test"))
        expect(screen.queryByTestId("input-house-test"))
        expect(screen.queryByTestId("input-entrance-test"))
        expect(screen.queryByTestId("input-floor-test"))
        expect(screen.queryByTestId("input-room-test"))

        act(() => {
            fireEvent.click(screen.getByTestId("ratio-cafe-test"))
        })

        expect(screen.queryByTestId("input-street-test")).toBeNull()
        expect(screen.queryByTestId("input-house-test")).toBeNull()
        expect(screen.queryByTestId("input-entrance-test")).toBeNull()
        expect(screen.queryByTestId("input-floor-test")).toBeNull()
        expect(screen.queryByTestId("input-room-test")).toBeNull()
        expect(screen.queryByTestId("input-key-test"))
    })

    test("Should appear date, time inputs with click on 'ratio-another-test'", () => {
        renderWithProviders(<OrderPage />)

        expect(screen.queryByTestId("input-date-test")).toBeNull()
        expect(screen.queryByTestId("input-time-test")).toBeNull()

        act(() => {
            fireEvent.click(screen.getByTestId("ratio-another-test"))
        })

        expect(screen.queryByTestId("input-date-test"))
        expect(screen.queryByTestId("input-time-test"))
    })

})