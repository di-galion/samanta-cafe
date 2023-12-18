import {fireEvent, render, screen} from "@testing-library/react";
import Popup from "@/components/ui/popup/Popup";


const CONTENT_TEST = "Some popup content"
const HEADER_TEST = "Header"
describe("Popup", () => {
    const mockedSetIsOpen = jest.fn()
    const mockedOnClickAgreeHandler = jest.fn()
    const mockedOnClickDisagreeHandler = jest.fn()

    beforeEach(() => {
        render(
            <Popup
                header={HEADER_TEST}
                content={CONTENT_TEST}
                setIsOpen={mockedSetIsOpen}
                onClickAgreeHandler={mockedOnClickAgreeHandler}
                onClickDisagreeHandler={mockedOnClickDisagreeHandler}
            />
        )
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    test("Should mockedSetIsOpen and mockedOnClickDisagreeHandler have been called with click on cross", () => {
        fireEvent.click(screen.getByTestId("popup-cross-test"))

        expect(mockedSetIsOpen).toHaveBeenCalledTimes(1)
        expect(mockedOnClickDisagreeHandler).toHaveBeenCalledTimes(1)
    })

    test("Should mockedSetIsOpen and mockedOnClickAgreeHandler have been called with click on 'yes' button", () => {
        fireEvent.click(screen.getByTestId("button-agree-test"))

        expect(mockedSetIsOpen).toHaveBeenCalledTimes(1)
        expect(mockedOnClickAgreeHandler).toHaveBeenCalledTimes(1)
    })

    test("Should mockedSetIsOpen and mockedOnClickDisagreeHandler have been called with click on 'no' button", () => {
        fireEvent.click(screen.getByTestId("button-disagree-test"))

        expect(mockedSetIsOpen).toHaveBeenCalledTimes(1)
        expect(mockedOnClickDisagreeHandler).toHaveBeenCalledTimes(1)
    })
})