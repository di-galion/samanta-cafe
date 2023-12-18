import {fireEvent, render} from "@testing-library/react";
import Select from "@/components/ui/select/Select";
import {act} from "react-dom/test-utils";

const SELECT_ITEMS_TEXT = [
    "item text 1",
    "item text 2"
]
describe("Select", () => {
    test("Should change select value and call onClick", () => {
        const onClick = jest.fn()
        const component = render(
            <Select
                onClick={onClick}
            >
                {SELECT_ITEMS_TEXT.map(i => {
                    return <li data-testid={i} key={i}>{i}</li>
                })}
            </Select>
        )

        expect(component.getByTestId("select-button-test").textContent).toBe(SELECT_ITEMS_TEXT[0])

        act(() => {
            fireEvent.click(component.getByTestId(SELECT_ITEMS_TEXT[1]))
        })
        expect(onClick).toHaveBeenCalledTimes(1)
        expect(component.getByTestId("select-button-test").textContent).toBe(SELECT_ITEMS_TEXT[1])
    })

    test("Set current value with props", () => {
        const VALUE = "TEST"
        const component = render(
            <Select currentValue={VALUE}></Select>
        )
        expect(component.getByTestId("select-button-test").textContent).toBe(VALUE)
    })
})