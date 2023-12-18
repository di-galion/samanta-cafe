import {configureStore, PreloadedState} from "@reduxjs/toolkit";
import {RootState} from "@reduxjs/toolkit/src/query/core/apiState";
import {rootReducer} from "@/store/store";
import {render, RenderOptions} from "@testing-library/react";
import {FC, PropsWithChildren} from "react";
import {Provider} from "react-redux";
import {createRouter} from "@remix-run/router";
import {RouterContext} from "next/dist/shared/lib/router-context";
import {AgnosticRouteObject} from "@remix-run/router/utils";
import {History} from "@remix-run/router/history";
import {QueryClient} from "@tanstack/query-core";
import {QueryClientProvider} from "@tanstack/react-query";

const router = jest.fn()
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            // ✅ turns retries off
            retry: false,
        },
    },
});
export const setupStore = (preloadedState?: PreloadedState<RootState<any, any, any>>) => {
    return configureStore({
        reducer: rootReducer,
        preloadedState
    })
}
interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
    preloadedState?: PreloadedState<RootState<any, any, any>>
    store?: ReturnType<typeof setupStore>
}
export function renderWithProviders(
    ui: React.ReactElement,
    {
        preloadedState = {},
        // Automatically create a store instance if no store was passed in
        store = setupStore(preloadedState),
        ...renderOptions
    }: ExtendedRenderOptions = {}
) {
    function Wrapper({ children }: PropsWithChildren<{}>): FC {
        return (
            <QueryClientProvider client={queryClient}>
                <RouterContext.Provider value={router}>
                    <Provider store={store}>{children}</Provider>
                </RouterContext.Provider>
            </QueryClientProvider>
        )
    }
    return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}

