import { createSlice } from "@reduxjs/toolkit";
import { Order } from "../../types/index.types";

export type AddOrderAction = {
    payload: Order;
    type: string;
}

export type RemoveOrderAction = {
    payload: number;
    type: string;
}

interface OrderState {
    orders: Array<Order>;
}

const defaultState: OrderState = {
    orders: []
}

const orderSlice = createSlice({
    name: "order",
    initialState: defaultState,
    reducers: {
        addOrder: (state, action: AddOrderAction) => {
            const newOrders = [...state.orders];
            newOrders.push(action.payload);
            state.orders = newOrders;
        },
        removeOrder: (state, action: RemoveOrderAction) => {

            // invalid index was provided
            if (action.payload >= state.orders.length) {
                return;
            }

            const newOrders = [...state.orders];
            newOrders.splice(action.payload, 1);
            state.orders = newOrders;
        }
    }
});

// by defining the reducers above '@reduxjs/toolkit' will create thunk functions for us.
export const { addOrder, removeOrder } = orderSlice.actions;

// by defining the slice above '@reduxjs/toolkit' will create reducers for us.
export default orderSlice.reducer;