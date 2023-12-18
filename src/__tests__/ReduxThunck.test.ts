import {register} from "@/store/user/user.actions";
import {AuthService} from "@/services/auth/auth.service";
import {jest} from "@jest/globals";


const user = {
    email: "test@gmail.com",
    password: "12345q",
    name: "Dima"
}
const mockRegister = jest.fn(() => AuthService.register(user))

describe("userSlice", () => {
    it("should register with resolved response", async () => {

        mockRegister.mockResolvedValue({data: user})

        const dispatch = jest.fn()

        const thunk = register(user)

        await thunk(dispatch, () => ({}), () => ({}))

        const {data} = await mockRegister()

        const {calls } = dispatch.mock

        const [start, end] = calls

        expect(start[0].type).toBe(register.pending().type)
        expect(end[0].type).toBe(register.fulfilled().type)
        expect(data).toEqual(user)

    })

    it("should register with rejected response", async () => {
        mockRegister.mockResolvedValue({data: {}})

        const dispatch = jest.fn()

        const thunk = register({})

        await thunk(dispatch, () => ({}), () => ({}))

        const {data} = await mockRegister()

        const {calls } = dispatch.mock

        const [start, end] = calls

        expect(start[0].type).toBe(register.pending().type)
        expect(end[0].type).toBe(register.rejected().type)
        // expect(end[0].payload.message).toBe('Request failed with status code 400')
    })
})