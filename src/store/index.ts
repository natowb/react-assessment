import { combineReducers, configureStore } from "@reduxjs/toolkit";
import orderReducer from "./orders/orderSlice";

const appReducer = combineReducers({
    order: orderReducer,
})


export const setupStore = (preloadedState?: Partial<AppState>) => {
    return configureStore({
        reducer: appReducer,
        preloadedState,
    })
}

export const store = setupStore();

// export the state types so we can access it in our application
export type AppState = ReturnType<typeof appReducer>;
export type AppStore = ReturnType<typeof setupStore>;

// export the type of our store dispatch so we can have type checking.
export type AppDispatch = typeof store.dispatch;