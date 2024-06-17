import { useSelector } from "react-redux";
import Card from "../../components/Card/Card";
import "./LandingPage.css"
import { AppState } from "../../store";

export default function LandingPage() {
    const orders = useSelector((state: AppState) => state.order.orders);


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
                            <span>Name: {order.firstName ? `${order.firstName} ${order.lastName}` : order.lastName}</span>
                            <span>Description: {order.description}</span>
                            <span>Quantity: {order.quantity}</span>
                            <button className="btn">Delete</button>
                        </li>
                    ))}
                </ul>
            </Card>

        </>
    );

}