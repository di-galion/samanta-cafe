import {useCart} from "@/hooks/useCart";
import {useTypedSelector} from "@/hooks/useTypedSelector";

const storeState = {
    items: [
        {name: "A", price: 12, category: 'D', quantity: 1, slug: "A", images: ["URL"], id: 1},
        {name: "B", price: 20, category: 'C', quantity: 2, slug: "B", images: ["URL"], id: 2}
    ]}

const cartResult = {
    ...storeState,
    total: 52
}

jest.mock("../useTypedSelector")
jest.spyOn({useTypedSelector}, "useTypedSelector").mockReturnValue(storeState)

describe("Use cart",  () => {

    afterEach(() => {
        jest.clearAllMocks()
    })

    test("Use cart implementation",  () => {
        const result =  useCart()

        expect(useTypedSelector).toHaveBeenCalledTimes(1)
        expect(result).toEqual(cartResult)
    })
})