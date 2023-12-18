"use client"

import {Provider as ReduxProvider} from "react-redux"
import {FC, PropsWithChildren} from "react";
import {persistor, store} from "../store/store"
import {PersistGate} from "redux-persist/integration/react";
import {QueryClient} from "@tanstack/query-core";
import {QueryClientProvider} from "@tanstack/react-query";

const queryClient = new QueryClient()

const Providers: FC<PropsWithChildren<unknown>> = ({children}) => {
    return (
        <div>
            <QueryClientProvider client={queryClient} >
                <ReduxProvider store={store} >
                    <PersistGate persistor={persistor}>
                        {children}
                    </PersistGate>
                </ReduxProvider>
            </QueryClientProvider>
        </div>
    )
}

export default Providers