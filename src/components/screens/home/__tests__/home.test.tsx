import {ProductService} from "@/services/product/product.service";
import {RETURN_PRODUCTS} from "@/components/screens/product/__tests__/constants";
import HomePage from "@/components/screens/home/HomePage";
import {renderWithProviders} from "@/__tests__/helpers/renderTestApp";
import {render} from "@testing-library/react";


jest.mock('../services/product/product.service')
jest.spyOn(ProductService, "getAll").mockReturnValue({data: RETURN_PRODUCTS})
describe('Home page', () => {

    test('Home page render', async () => {
        const component = await HomePage()

        render(component)

        expect(ProductService.getAll).toHaveBeenCalledTimes(1)
    })
})


