import get from "@/a/a";
import {dod} from "@/a/do";
import clearAllMocks = jest.clearAllMocks;



jest.mock('./do')

const spyObj = {dod}
const a = jest.spyOn({dod}, "dod").mockImplementation(() => 100)
test("sdf", () => {
    const result = get()
    // console.log("DOD", dod())
    // console.log("RESULT", result)
    expect(dod).toHaveBeenCalledTimes(1)
    expect(result).toBe(110)
    clearAllMocks()
})

test("fgfh", () => {
    jest.mock("./a")
    jest.spyOn({get}, "get").mockImplementation(() => 1000)

    console.log("GET", get())
    clearAllMocks()
})