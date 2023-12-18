import {rootReducer} from "@reduxjs/toolkit/src/tests/injectableCombineReducers.example";
import {rootActions} from "@/store/rootActions";
import {cartReducer} from "@/store/cart/cart.slice";
import ProductPage from "@/components/screens/product/ProductPage";
import {render, screen} from "@testing-library/react";
import {ProductService} from "@/services/product/product.service";
import {RETURN_PRODUCTS} from "@/components/screens/product/__tests__/constants";
import {renderWithProviders} from "@/__tests__/helpers/renderTestApp";



jest.mock("../../../../services/product/product.service")
jest.spyOn(ProductService, "getAll").mockReturnValue({data: RETURN_PRODUCTS})
jest.spyOn(ProductService, "getBySlug").mockReturnValue({data: RETURN_PRODUCTS[0]})
describe("Product page",  () => {

     test("Product page render", async () => {
         const component = await ProductPage({params: {slug: "d"}})
         renderWithProviders(component)

         expect(ProductService.getBySlug).toHaveBeenCalledTimes(1)
         expect(ProductService.getAll).toHaveBeenCalledTimes(1)

         expect(screen.getAllByTestId("product-item-test").length).toBe(RETURN_PRODUCTS.length)
    })
})