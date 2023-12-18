import {fireEvent, screen, waitFor} from "@testing-library/react";
import Auth from "@/components/screens/auth/Auth";
import {useActions} from "@/hooks/useActions";
import {renderWithProviders} from "@/__tests__/helpers/renderTestApp";
import {act} from "react-dom/test-utils";
import {AuthService} from "@/services/auth/auth.service";
import {rootActions} from "@/store/rootActions";
import {useCart} from "@/hooks/useCart";
import {login, register} from "@/store/user/user.actions";

const mockedUseRouterReplace = jest.fn()
jest.mock('next/navigation', () => ({
    useRouter: () => ({
        replace: mockedUseRouterReplace
    })
}))


jest.mock("../store/user/user.actions")
const mockedLogin = jest.spyOn({login}, "login")
    .mockImplementation(() => jest.fn())
const mockedRegister = jest.spyOn({register}, "register")
    .mockImplementation(() => jest.fn())

jest.mock("../hooks/useActions")
const mockedUseActions = jest.spyOn({useActions}, "useActions")
    .mockImplementation(() => {
        return ({
            login: login,
            register: register
        })
    })

describe("Authorisation and login", () => {

    beforeEach(() => {
        renderWithProviders(<Auth />)
    })

    afterEach(() => {
        jest.clearAllMocks();
    })

    test("Should login function have been called", async () => {

        const emailInput = screen.getByTestId("email-input-test")
        act(() => {
            fireEvent.input(emailInput, {
                target: {value: "email@gmail.com"}
            })
        })

        const passwordInput = screen.getByTestId("password-input-test")
        act(() => {
            fireEvent.input(passwordInput, {
                target: {value: "124245q"}
            })
        })

       const button = screen.getAllByText("Submit")

       await waitFor(() => {
            act(() => {
                return fireEvent.click(button[0])
            })
        })

        expect(useActions).toHaveBeenCalledTimes(1)
        expect(login).toHaveBeenCalledTimes(1)
        expect(mockedUseRouterReplace).toHaveBeenCalledTimes(1)
    })

    test("Should register function have been called", async () => {

        // Toggle to registration
        const buttonToggle = screen.getByTestId("button-toggle-test")
        act(() => {
            fireEvent.click(buttonToggle)
        })

        const emailInput = screen.getByTestId("email-input-test")
        act(() => {
            fireEvent.input(emailInput, {
                target: {value: "email@gmail.com"}
            })
        })

        const passwordInput = screen.getByTestId("password-input-test")
        act(() => {
            fireEvent.input(passwordInput, {
                target: {value: "124245q"}
            })
        })

        const nameInput = screen.getByTestId("name-input-test")
        act(() => {
            fireEvent.input(nameInput, {
                target: {value: "User"}
            })
        })

        const button = screen.getAllByText("Submit")

        await waitFor(() => {
            act(() => {
                return fireEvent.click(button[0])
            })
        })

        expect(register).toHaveBeenCalledTimes(1)
    })

    test("Should toggle login reset whit btn", async () => {

        const register = await screen.findByText(/register/i)
        expect(register)

        const button = screen.getByTestId("button-toggle-test")
        act(() => {
            fireEvent.click(button)
        })

        const login = await screen.findByText(/login/i)
        expect(login)
    })

    test("Should display 2 inputs with login and 3 inputs with register", async () => {

        expect(screen.queryByTestId("name-input-test")).toBeNull()

        const button = screen.getByTestId("button-toggle-test")
        act(() => {
            fireEvent.click(button)
        })

        expect(screen.queryByTestId("name-input-test"))
    })
})