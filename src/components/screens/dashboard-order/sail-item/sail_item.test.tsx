import {useDeleteSailMutation} from "@/components/screens/dashboard-order/sail-item/useDeleteSailMutation.hook";
import {useUpdateSailMutation} from "@/components/screens/dashboard-order/sail-item/useUpdateSailMutation.hook";
import {renderWithProviders} from "@/__tests__/helpers/renderTestApp";
import SailItem from "@/components/screens/dashboard-order/sail-item/SailItem";
import {PRODUCTS_TEST} from "@/components/screens/product/__tests__/constants";
import {ORDERS_TEST, SAILS_TEST} from "@/components/screens/dashboard-order/orders-catalog/__tests__/constants";
import {fireEvent} from "@testing-library/react";
import {act} from "react-dom/test-utils";


const mockedDeleteMutate = jest.fn()
jest.mock("./useDeleteSailMutation.hook")
jest.spyOn({useDeleteSailMutation}, "useDeleteSailMutation").mockImplementation(() => {
    return mockedDeleteMutate
})

const mockedUpdateMutate = jest.fn()
jest.mock("./useUpdateSailMutation.hook")
jest.spyOn({useUpdateSailMutation}, "useUpdateSailMutation").mockImplementation(() => {
    return mockedUpdateMutate
})
describe("Sail item", () => {

    afterEach(() => {
        jest.clearAllMocks()
    })

    test("Should call useDeleteSailMutation with click", () => {
        const component = renderWithProviders(<SailItem sail={SAILS_TEST[0]} />)
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