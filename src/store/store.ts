import {configureStore, combineReducers} from "@reduxjs/toolkit";
import {userSlice} from "@/store/user/user.slice";
import {persistStore} from "redux-persist"
import {FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE} from "redux-persist/es/constants";
import cartSlice from "@/store/cart/cart.slice";



const isClient = typeof window !== 'undefined'

const combinedReducers = combineReducers({
    user: userSlice.reducer,
    cart: cartSlice.reducer
})

let mainReducer = combinedReducers
if (isClient) {
    const { persistReducer } = require('redux-persist')
    const storage = require('redux-persist/lib/storage').default

    const persistConfig = {
        key: 'amazon-v2',
        storage,
        whitelist: ['cart']
    }

    mainReducer = persistReducer(persistConfig, combinedReducers)
}

export const store = configureStore({
    reducer: mainReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false
            // serializableCheck: {
            //     ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
            // }
        }),
})

export type TypeRootState = ReturnType<typeof store.getState>
export const persistor = persistStore(store)
export const rootReducer = mainReducer





