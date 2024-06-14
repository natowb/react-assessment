import { Route, Routes } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import OrderPage from "../../pages/OrderPage/OrderPage";
import LandingPage from "../../pages/LandingPage/LandingPage";

import "./AppLayout.css";

export default function AppLayout() {
    return (
        <>
            <Navbar />
            <div className="app-layout">
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/new" element={<OrderPage />} />
                </Routes>
            </div>
        </>
    )
}