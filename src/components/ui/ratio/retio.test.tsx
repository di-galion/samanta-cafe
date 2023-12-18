import Ratio from "@/components/ui/ratio/Ratio";
import {fireEvent, render} from "@testing-library/react";

const NAME_TEST = "ratios 1"
const NAME_SECOND_TEST = "ratios 2"
const CONTENT_TEST = "Some content"
describe("Ratio", () => {


    test("Should render, call mockedOnClick and change value", () => {
        let value
        const mockedOnClick = jest.fn(v => {
            value = v
        })
        const component = render(
            <Ratio
                onClick={mockedOnClick}
                name={NAME_TEST}
                content={CONTENT_TEST}
            />
        )
        const ratio = component.getByTestId("ratio-input-test")
        fireEvent.click(ratio)

        expect(ratio).toHaveProperty("name", NAME_TEST)
        expect(mockedOnClick).toHaveBeenCalledTimes(1)
        expect(value).toBe(CONTENT_TEST)
        expect(component.getByText(CONTENT_TEST))
    })

    test("Should have checked with prop checked = true", () => {
        const component = render(
            <Ratio
                checked={true}
                name={NAME_TEST}
                content={CONTENT_TEST}
            />
        )
        expect(component.getByTestId("ratio-input-test")).toHaveProperty("checked", true)
    })



    test("Should check ratio and uncheck another", () => {
        const component = render(
            <>
                <Ratio
                    name={NAME_TEST}
                    content={CONTENT_TEST}
                />
                <Ratio
                    name={NAME_TEST}
                    content={CONTENT_TEST}
                />
                <Ratio
                    checked={true}
                    name={NAME_TEST}
                    content={CONTENT_TEST}
                />
            </>
        )
        fireEvent.click(component.getAllByTestId("ratio-input-test")[0])
        let ratios = component.getAllByTestId("ratio-input-test")
        expect(ratios[0]).toHaveProperty("checked", true)
        expect(ratios[1]).toHaveProperty("checked", false)
        expect(ratios[2]).toHaveProperty("checked", false)

        fireEvent.click(component.getAllByTestId("ratio-input-test")[1])
        ratios = component.getAllByTestId("ratio-input-test")
        expect(ratios[0]).toHaveProperty("checked", false)
        expect(ratios[1]).toHaveProperty("checked", true)
        expect(ratios[2]).toHaveProperty("checked", false)
    })

    test("Should ratios with different name not act to each-other", () => {
        const component = render(
            <>
                <Ratio
                    name={NAME_TEST}
                    content={CONTENT_TEST}
                />
                <Ratio
                    name={NAME_SECOND_TEST}
                    content={CONTENT_TEST}
                />
            </>
        )

        let ratios = component.getAllByTestId("ratio-input-test")
        fireEvent.click(ratios[0])
        fireEvent.click(ratios[1])
        ratios = component.getAllByTestId("ratio-input-test")
        expect(ratios[0]).toHaveProperty("checked", true)
        expect(ratios[0]).toHaveProperty("checked", true)
    })

    test("Should all ratios be unchecked", () => {
        const component = render(
            <>
                <Ratio
                    name={NAME_TEST}
                    content={CONTENT_TEST}
                />
                <Ratio
                    name={NAME_TEST}
                    content={CONTENT_TEST}
                />
                <Ratio
                    name={NAME_TEST}
                    content={CONTENT_TEST}
                />
            </>
        )
        component.getAllByTestId("ratio-input-test").forEach((e) => {
            expect(e).toHaveProperty("defaultChecked", false)
        })
    })
})