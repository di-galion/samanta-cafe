import {fireEvent, render, screen} from "@testing-library/react";
import A from "./A";
import get from "@/a/a"
import {someFunction} from "./utils";
import {jest} from "@jest/globals";
import {useActions} from "@/hooks/useActions";
import {renderWithProviders} from "@/__tests__/helpers/renderTestApp";

jest.mock("../hooks/useActions")
const mockedUseActions = jest.spyOn({useActions}, "useActions")

// jest.mock("./utils")

// jest.mock("../hooks/useActions.ts")
// const login = jest.fn()
// jest.spyOn({useActions}, "useActions").mockReturnValue({login})

const spyObj = {get, someFunction}

jest.mock("../a/do")
jest.mock("../a/a")

// jest.spyOn(spyObj, "get").mockImplementation(() => 10000)
jest.spyOn(spyObj, "someFunction")

// const s = get()
// console.log("GET", s)

test("sdf1", () => {
    render(<A />)

    jest.mock("../a/a", () => ({get: jest.fn()}))
    jest.spyOn({get}, "get").mockImplementation(() => 1000)
    screen.debug()
    console.log("GET", get())

    // expect(get).toHaveBeenCalledTimes(1)

    const button = screen.getByTestId("button")

    fireEvent.click(button)
    screen.debug()

    // expect(someFunction).toHaveBeenCalledTimes(1)
    // expect(useActions).toHaveBeenCalledTimes(1)
    jest.clearAllMocks()
})


jest.mock("../hooks/useActions")
jest.spyOn({useActions}, "useActions").mockImplementation(() => {
    return 12
})

console.log("USE_ACTIONS", useActions())
test("Use actions", () => {
   renderWithProviders(<A />)
    console.log("USE_ACTIONS", useActions())
    // expect(useActions).toHaveBeenCalledTimes(1)
})