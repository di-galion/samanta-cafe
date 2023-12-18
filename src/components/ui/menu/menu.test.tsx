import {fireEvent, render, screen, waitFor} from "@testing-library/react";
import Menu, {MAX_CATEGORIES_ON_HEADER} from "@/components/ui/menu/Menu";
import {act} from "react-dom/test-utils";
import { renderWithProviders, setupStore} from "@/__tests__/helpers/renderTestApp";
import renderer from "react-test-renderer"
import {QueryClientProvider} from "@tanstack/react-query";
import {QueryClient} from "@tanstack/query-core";
import {Provider} from "react-redux";
import nock from "nock";
import {CategoryService} from "@/services/category/category.service";
import {useGetCategories} from "@/hooks/queries/useGetCategories";
import {useProfile} from "@/hooks/useProfile";
import {DASHBOARD_URL} from "@/constants/url.constants";
import React, {ReactElement} from "react";

const CATEGORIES_TEST =[
    {
        name: "Category 1",
        id: 1,
        slug: "Category 1",
    },
    {
        name: "Category 2",
        id: 2,
        slug: "Category 2",
    },
    {
        name: "Category 3",
        id: 3,
        slug: "Category 3",
    },
    {
        name: "Category 4",
        id: 4,
        slug: "Category 4",
    },
    {
        name: "Category 5",
        id: 5,
        slug: "Category 5",
    },
    {
        name: "Category 6",
        id: 6,
        slug: "Category 6",
    },
    {
        name: "Category 7",
        id: 7,
        slug: "Category 7",
    },
]

jest.mock(
    'next/link',
    () =>
        (child) => {
        // console.log(child)
            return <a href={child.href}>{child.children}</a>
        }
);
const mockedUseRouterPush = jest.fn()
const mockedUsePathname = jest.fn();
jest.mock('next/navigation', () => ({
    useRouter: () => ({
        push: mockedUseRouterPush
    }),
    usePathname: () => mockedUsePathname,
}))

jest.mock('../../../services/category/category.service')

jest.mock("../../../hooks/useProfile")
jest.spyOn({useProfile}, "useProfile").mockImplementation(() => ({profile: {isAdmin: false}}))

jest.mock('../../../hooks/queries/useGetCategories')
describe("Menu", () => {

    afterEach(() => {
        jest.clearAllMocks()
    })

    test("Should display categories if isLoading = true",  () => {
        jest.spyOn({useGetCategories}, "useGetCategories").mockReturnValue({data: CATEGORIES_TEST, isLoading: true})

        renderWithProviders(<Menu />)

        expect(screen.queryAllByTestId("category-item-test").length).toBe(0)

        expect(useGetCategories).toHaveBeenCalledTimes(1)
    })

    test("Menu in sidebar",  () => {
        jest.spyOn({useGetCategories}, "useGetCategories").mockReturnValue({data: CATEGORIES_TEST, isLoading: false})

        renderWithProviders(<Menu />)
        expect(screen.getAllByTestId("category-item-test").length).toBe(CATEGORIES_TEST.length)

        expect(useGetCategories).toHaveBeenCalledTimes(1)
    })

    test("Menu in header",  () => {
        jest.spyOn({useGetCategories}, "useGetCategories").mockReturnValue({data: CATEGORIES_TEST, isLoading: false})

        renderWithProviders(<Menu fromSidebar={false}/>)
        expect(screen.getAllByTestId("category-item-test").length).toBe(MAX_CATEGORIES_ON_HEADER)

        act(() => {
            fireEvent.click(screen.getByTestId("button-dots-test"))
        })

        expect(screen.getAllByTestId("category-item-test").length).toBe(CATEGORIES_TEST.length)

        expect(useGetCategories).toHaveBeenCalledTimes(2)
    })

    test("Menu sidebar with admin user ",  async () => {
        jest.spyOn({useGetCategories}, "useGetCategories").mockReturnValue({data: CATEGORIES_TEST, isLoading: false})

        jest.spyOn({useProfile}, "useProfile").mockReturnValue({profile: {isAdmin: true}})

        renderWithProviders(<Menu />)

        expect(screen.getByText("To dashboard").closest("a")).toHaveProperty("href", `${window.location.href}dashboard`)

        expect(useProfile).toHaveBeenCalledTimes(1)
        expect(useGetCategories).toHaveBeenCalledTimes(1)
    })

})