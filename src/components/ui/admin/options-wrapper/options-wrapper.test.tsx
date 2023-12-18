import {useDeleteSailMutation} from "@/components/screens/dashboard-order/sail-item/useDeleteSailMutation.hook";
import {useUpdateSailMutation} from "@/components/screens/dashboard-order/sail-item/useUpdateSailMutation.hook";
import {renderWithProviders} from "@/__tests__/helpers/renderTestApp";
import SailItem from "@/components/screens/dashboard-order/sail-item/SailItem";
import {PRODUCTS_TEST} from "@/components/screens/product/__tests__/constants";
import {ORDERS_TEST, SAILS_TEST} from "@/components/screens/dashboard-order/orders-catalog/__tests__/constants";
import {fireEvent} from "@testing-library/react";
import {act} from "react-dom/test-utils";
import OptionsWrapper from "@/components/ui/admin/options-wrapper/OptionsWrapper";


describe("Options wrapper", () => {

    afterEach(() => {
        jest.clearAllMocks()
    })

    let isEditing = false
    const mockedSetIsEditing = jest.fn(() => isEditing = !isEditing)
    const mockedSetIsPopupOpen = jest.fn()

    test("Should call setIsEditing and change isEditing to true with click", () => {
        const component = renderWithProviders(
            <OptionsWrapper
                isEditing={isEditing}
                onConfirmClick={mockedSetIsPopupOpen}
                setIsEditing={mockedSetIsEditing}
            />)
        fireEvent.click(component.getByTestId("button-edit-options-test"))

        expect(mockedSetIsEditing).toHaveBeenCalledTimes(1)
        expect(isEditing).toBe(true)
    })

    test("Should call setIsPopupOpen with click", () => {
        const component = renderWithProviders(
            <OptionsWrapper
                isEditing={true}
                onConfirmClick={mockedSetIsPopupOpen}
                setIsEditing={mockedSetIsEditing}
            />)

        fireEvent.click(component.getByTestId("button-confirm-options-test"))
        expect(mockedSetIsPopupOpen).toHaveBeenCalledTimes(1)
    })
})