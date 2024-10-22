
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Make sure to create the corresponding CSS file

const Navbar = () => {
    return (
        <nav className="navbar">
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/suppliers/add">Add Supplier</Link>
                </li>
                <li>
                    <Link to="/suppliers/list">Supplier List</Link>
                </li>
                <li>
                    <Link to="/purchase-orders/add">Add Purchase Order</Link>
                </li>
                <li>
                    <Link to="/purchase-orders/list">Purchase Order List</Link>
                </li>
                <li>
                    <Link to="/items/add">Add Item</Link>
                </li>
                <li>
                    <Link to="/items/list">Item List</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
