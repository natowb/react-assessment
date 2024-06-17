import { useDispatch, useSelector } from "react-redux";
import Card from "../../components/Card/Card";
import "./LandingPage.css"
import { AppDispatch, AppState } from "../../store";
import { removeOrder } from "../../store/orders/orderSlice";

export default function LandingPage() {
    const orders = useSelector((state: AppState) => state.order.orders);
    const dispatch: AppDispatch = useDispatch();

    const deleteOrder = (orderIndex: number) => {
        dispatch(removeOrder(orderIndex));
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

                <ul className="order-list">
                    {orders.map((order, index) => (
                        <li key={index} className="order-item">
                            <p>Name: {order.firstName ? `${order.firstName} ${order.lastName}` : order.lastName}</p>
                            <p>Description: {order.description}</p>
                            <p>Quantity: {order.quantity}</p>
                            <button
                                className="btn"
                                onClick={() => deleteOrder(index)}>
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            </Card>

        </>
    );

}