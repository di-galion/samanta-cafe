import {useGetProducts} from "@/components/screens/dashboard-order/product-list/useGetProducts.hook";
import {PRODUCTS_TEST} from "@/components/screens/product/__tests__/constants";
import {renderWithProviders} from "@/__tests__/helpers/renderTestApp";
import ProductList from "@/components/screens/dashboard-order/product-list/ProductList";
import {fireEvent, screen} from "@testing-library/react";
import ProductListItem from "@/components/screens/dashboard-order/product-list-item/ProductListItem";

describe("Product list item", () => {

    afterEach(() => {
        jest.clearAllMocks()
    })

    test("Product list item render", () => {

        const component = renderWithProviders(<ProductListItem product={PRODUCTS_TEST[0]} setNewSailOnClick={jest.fn()} orderId={1} />)

        expect(component.getByRole("img"))
        expect(component.getByText(PRODUCTS_TEST[0].description))
        expect(component.getByText(PRODUCTS_TEST[0].name))
        expect(component).toMatchSnapshot()
    })

    test("Should call setNewSailOnClick with click on 'product-list-item-test'", () => {
        const setNewSailOnClick = jest.fn()
        const component = renderWithProviders(<ProductListItem product={PRODUCTS_TEST[0]} setNewSailOnClick={setNewSailOnClick} orderId={1} />)

        fireEvent.click(component.getByTestId("product-list-item-test"))

        expect(setNewSailOnClick).toHaveBeenCalledTimes(1)
    })

})