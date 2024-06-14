import { createBrowserRouter } from "react-router-dom";
import LandingPage from "./pages/LandingPage/LandingPage";
import OrderPage from "./pages/OrderPage/OrderPage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <LandingPage />
    },
    {
        path: "/new",
        element: <OrderPage />
    }
])
