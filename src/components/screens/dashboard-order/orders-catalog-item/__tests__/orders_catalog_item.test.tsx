import {useProfile} from "@/hooks/useProfile";
import {renderWithProviders} from "@/__tests__/helpers/renderTestApp";
import DashboardPage from "@/components/screens/dashboard/DashboardPage";
import {shallow} from "enzyme"
import {fireEvent, screen} from "@testing-library/react";
import DashboardOrderPage from "@/components/screens/dashboard-order/DashboardOrderPage";
import OrdersCatalogItem from "@/components/screens/dashboard-order/orders-catalog-item/OrdersCatalogItem";
import {ORDERS_TEST, SAILS_TEST} from "@/components/screens/dashboard-order/orders-catalog/__tests__/constants";
import {useDeleteSailMutation} from "@/components/screens/dashboard-order/sail-item/useDeleteSailMutation.hook";
import {useUpdateSailMutation} from "@/components/screens/dashboard-order/sail-item/useUpdateSailMutation.hook";
import {useUpdateOrderMutationHook} from "@/components/screens/dashboard-order/orders-catalog-item/useUpdateOrderMutation.hook";
import {
    useCreateSailMutation
} from "@/components/screens/dashboard-order/orders-catalog-item/useCreateSailMutation.hook";
import SailItem from "@/components/screens/dashboard-order/sail-item/SailItem";
import {act} from "react-dom/test-utils";

jest.mock('next/navigation', () => ({
    useRouter: () => ({
        replace: jest.fn()
    })
}))

const mockedUpdateOrderMutate = jest.fn()
jest.mock("../useUpdateOrderMutation.hook")
jest.spyOn({useUpdateOrderMutation: useUpdateOrderMutationHook}, "useUpdateOrderMutation").mockImplementation(() => {
    return mockedUpdateOrderMutate
})

const mockedCreateSailMutate = jest.fn()
jest.mock("../useCreateSailMutation.hook")
jest.spyOn({useCreateSailMutation}, "useCreateSailMutation").mockImplementation(() => {
    return mockedCreateSailMutate
})
describe("Order catalog item", () => {

    afterEach(() => {
        jest.clearAllMocks()
    })

    test("Order catalog item render", () => {
        const component = renderWithProviders(<OrdersCatalogItem order={ORDERS_TEST[0]} />)

        expect(screen.getByText(ORDERS_TEST[0].total))
        expect(component).toMatchSnapshot()
    })

    test("Should call useCreateSailMutation with click", () => {
        const component = renderWithProviders(<OrdersCatalogItem order={ORDERS_TEST[0]} />)
        fireEvent.click(component.getByTestId("button-delete-test"))
        expect(mockedDeleteMutate).toHaveBeenCalledTimes(1)
    })

    test("Should call useUpdateSailMutation with click", () => {
        const component = renderWithProviders(<SailItem sail={SAILS_TEST[0]} />)
        act(() => {
            fireEvent.click(component.getByTestId('button-edit-test'))
        })

        fireEvent.click(component.getByTestId("button-confirm-test"))
        expect(mockedUpdateMutate).toHaveBeenCalledTimes(1)
    })

})