import { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {

    const [isOpen, setOpen] = useState(false);

    const toggleMenu = () => {
        setOpen(!isOpen);
    }

    return (
        <nav>
            <div className="dropdown">
                <button onClick={toggleMenu} className="btn">
                    Menu
                </button>
                {isOpen && (
                    <div className="dropdown-menu">
                        <Link to="/" className="dropdown-item">Home</Link>
                        <Link to="/new" className="dropdown-item">New Item</Link>
                    </div>
                )}
            </div>
        </nav>
    );

}