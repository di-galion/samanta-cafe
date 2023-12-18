import {renderWithProviders} from "@/__tests__/helpers/renderTestApp";
import InputsSectionWrapper from "@/components/ui/admin/inputs-section-wrapper/InputsSectionWrapper";
import commander from "commander";

const ARRAY_OF_VALUE_TEST = ["value 1", "value 2"]
const ARRAY_OF_HEAD_TEST = ["head 1", "head 2"]
describe("Input section wrapper", () => {
    test('Should render', () => {
        const component = renderWithProviders(
            <InputsSectionWrapper
                isEditing={true}
                arrayOfValue={ARRAY_OF_VALUE_TEST}
                arrayOfHead={ARRAY_OF_HEAD_TEST}
            />
        )
        for (let i = 0; i < ARRAY_OF_VALUE_TEST.length; i++) {
            expect(component.getByTestId(`input-${ARRAY_OF_VALUE_TEST[i]}-section-test`))
                .toHaveProperty("disabled", false)
            expect(component.getByText(ARRAY_OF_HEAD_TEST[i]))
        }
    })
    test('Should inputs be disabled with isEditing = false', () => {
        const component = renderWithProviders(
            <InputsSectionWrapper
                isEditing={false}
                arrayOfValue={ARRAY_OF_VALUE_TEST}
                arrayOfHead={ARRAY_OF_HEAD_TEST}
            />
        )
        for (let i = 0; i < ARRAY_OF_VALUE_TEST.length; i++) {
            expect(component.getByTestId(`input-${ARRAY_OF_VALUE_TEST[i]}-section-test`))
                .toHaveProperty("disabled", true)
        }
    })

})