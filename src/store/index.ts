import { configureStore } from "@reduxjs/toolkit";
import orderReducer from "./orders/orderSlice";

export const store = configureStore({
    reducer: {
        order: orderReducer
    }
})

// export the state type so we can access it in our application
export type AppState = ReturnType<typeof store.getState>;

// export the type of our store dispatch so we can have type checking.
export type AppDispatch = typeof store.dispatch;