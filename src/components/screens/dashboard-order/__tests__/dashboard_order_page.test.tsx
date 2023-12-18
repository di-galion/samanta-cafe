import {useProfile} from "@/hooks/useProfile";
import {renderWithProviders} from "@/__tests__/helpers/renderTestApp";
import DashboardPage from "@/components/screens/dashboard/DashboardPage";
import {screen} from "@testing-library/react";
import DashboardOrderPage from "@/components/screens/dashboard-order/DashboardOrderPage";

jest.mock('next/navigation', () => ({
    useRouter: () => ({
        replace: jest.fn()
    })
}))

jest.mock("../../../../hooks/useProfile")
jest.spyOn({useProfile}, "useProfile").mockImplementation(() => ({profile: {isAdmin: false}}))

describe("Dashboard order page", () => {

    afterEach(() => {
        jest.clearAllMocks()
    })

    test("Should only for admin page with no admin user", () => {
        const component = renderWithProviders(<DashboardOrderPage />)

        expect(screen.getByTestId("only-admin-test"))
        expect(component).toMatchSnapshot()
    })

    test("Should render with admin user", () => {
        jest.spyOn({useProfile}, "useProfile").mockImplementation(() => ({profile: {isAdmin: true}}))
        const component = renderWithProviders(<DashboardOrderPage />)
        expect(screen.getByText(/orders/i))
        expect(component).toMatchSnapshot()
    })

})