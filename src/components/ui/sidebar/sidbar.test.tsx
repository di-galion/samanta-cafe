import Sidebar from "@/components/ui/sidebar/Sidebar";
import {fireEvent, render} from "@testing-library/react";
import {renderWithProviders} from "@/__tests__/helpers/renderTestApp";

describe("Sidebar", () => {
    const mockedSetIsOpen = jest.fn()
    test("Should call mockedSetIsOpen click", () => {
        const component = renderWithProviders(<Sidebar setIsOpen={mockedSetIsOpen} />)
        fireEvent.click(component.getByTestId("sidebar-test"))
        expect(mockedSetIsOpen).toHaveBeenCalledTimes(1)
    })
})