import {renderWithProviders} from "@/__tests__/helpers/renderTestApp";
import OrdersCatalogItem from "@/components/screens/dashboard-order/orders-catalog-item/OrdersCatalogItem";
import {ORDERS_TEST} from "@/components/screens/dashboard-order/orders-catalog/__tests__/constants";
import {screen} from "@testing-library/react";
import ProductList from "@/components/screens/dashboard-order/product-list/ProductList";
import {PRODUCTS_TEST} from "@/components/screens/product/__tests__/constants";
import {useGetProducts} from "@/components/screens/dashboard-order/product-list/useGetProducts.hook";


jest.mock("./useGetProducts.hook")
jest.spyOn({useGetProducts}, "useGetProducts").mockReturnValue({
    data: PRODUCTS_TEST,
    isLoading: false
})
describe("Product list", () => {

    afterEach(() => {
        jest.clearAllMocks()
    })

    test("Product list render", () => {
        jest.spyOn({useGetProducts}, "useGetProducts").mockReturnValue({
            data: PRODUCTS_TEST,
            isLoading: false
        })

        const component = renderWithProviders(<ProductList setNewSailOnClick={jest.fn()} orderId={1} />)

        expect(screen.getAllByTestId("product-list-item-test").length).toBe(PRODUCTS_TEST.length)
        expect(component).toMatchSnapshot()
    })

    test("Should render loader with isLoading = true", () => {
        jest.spyOn({useGetProducts}, "useGetProducts").mockReturnValue({
            data: PRODUCTS_TEST,
            isLoading: true
        })

        const component = renderWithProviders(<ProductList setNewSailOnClick={jest.fn()} orderId={1} />)

        expect(screen.queryByTestId("product-list-item-test")).toBeNull()
        expect(component.getAllByTestId("loader-test"))
        expect(component).toMatchSnapshot()
    })

})