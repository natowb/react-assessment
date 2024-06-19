import { useDispatch, useSelector } from "react-redux";
import Card from "../../components/Card/Card";
import "./LandingPage.css"
import { AppDispatch, AppState } from "../../store";
import { removeOrder } from "../../store/orders/orderSlice";

export default function LandingPage() {
    const orders = useSelector((state: AppState) => state.order.orders);
    const dispatch: AppDispatch = useDispatch();

    const deleteOrder = (orderId: string) => {
        dispatch(removeOrder(orderId));
    }

    return (
        <>
            <h1>Order(s)</h1>
            <Card>
                {
                    orders.length === 0 && (
                        <p>
                            No orders have been placed so far
                        </p>
                    )
                }

                {/*
                Using index can cause problems if the orders array was being dynamicly edited, however since
                redux state should be immutable and is treated as such when an order is removed the entire array is reset
                if there was a real database would use a unique key from that as the key.
                */}

                <ul className="order-list">
                    {orders.map((order) => (
                        <li key={order.id} className="order-item">
                            <p>Name: {order.firstName ? `${order.firstName} ${order.lastName}` : order.lastName}</p>
                            <p>Description: {order.description}</p>
                            <p>Quantity: {order.quantity}</p>
                            <button
                                className="btn"
                                onClick={() => deleteOrder(order.id)}>
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            </Card>

        </>
    );

}