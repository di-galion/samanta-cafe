import {useProfile} from "@/hooks/useProfile";
import {renderWithProviders} from "@/__tests__/helpers/renderTestApp";
import DashboardPage from "@/components/screens/dashboard/DashboardPage";
import {fireEvent, screen} from "@testing-library/react";
import DashboardOrderPage from "@/components/screens/dashboard-order/DashboardOrderPage";
import {OrderService} from "@/services/order/order.service";
import {ORDERS_TEST} from "@/components/screens/dashboard-order/orders-catalog/__tests__/constants";
import OrdersCatalog from "@/components/screens/dashboard-order/orders-catalog/OrdersCatalog";
import * as ReactQuery from "@tanstack/react-query";
import {useGetOrders} from "@/components/screens/dashboard-order/orders-catalog/useGetOrders.hook";
import {act} from "react-dom/test-utils";
import {EnumOrderStatus} from "@/components/screens/dashboard-order/orders-catalog-item/types/types";

jest.mock('next/navigation', () => ({
    useRouter: () => ({
        replace: jest.fn()
    })
}))

// jest.mock("../../../../../services/order/order.service")
// jest.spyOn(OrderService, "findAll").mockReturnValue({
//     status: 200,
//     statusText: 'OK',
//     data: ORDERS_TEST,
// })

jest.mock("../useGetOrders.hook")
jest.spyOn({useGetOrders}, "useGetOrders").mockReturnValue({
    isLoading: false,
    data: ORDERS_TEST,
})

describe("Orders catalog", () => {

    afterEach(() => {
        jest.clearAllMocks()
    })

    test("Should have 'order-item-test' in count ORDERS_TEST.length", () => {
        const component = renderWithProviders(<OrdersCatalog />)

        expect(screen.getAllByTestId("order-item-test").length).toBe(ORDERS_TEST.length)
        expect(component).toMatchSnapshot()
    })

    test("Should filter by status", () => {
        const component = renderWithProviders(<OrdersCatalog />)

        act(() => {
            fireEvent.click(component.getByTestId(`select-item-${EnumOrderStatus.NOT_CONFIRMED}-test`))
        })

        expect(screen.getAllByTestId("order-item-test").length)
            .toBe(ORDERS_TEST
                .filter((i) => i.status === EnumOrderStatus.NOT_CONFIRMED).length)
        expect(component).toMatchSnapshot()
    })

})