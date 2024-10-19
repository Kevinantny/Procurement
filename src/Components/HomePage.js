// src/Components/HomePage.js
import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css'; // Create this CSS file for styling

const HomePage = () => {
    return (
        <div className="home-page">
            <h1>Procurement System</h1>
            <div className="nav-links">
                <h2>Supplier Management</h2>
                <ul>
                    <li><Link to="/suppliers/add">Add Supplier</Link></li>
                    <li><Link to="/suppliers/list">View Suppliers</Link></li>
                </ul>

                <h2>Purchase Order Management</h2>
                <ul>
                    <li><Link to="/purchase-orders/add">Add Purchase Order</Link></li>
                    <li><Link to="/purchase-orders/list">View Purchase Orders</Link></li>
                </ul>

                <h2>Item Management</h2>
                <ul>
                    <li><Link to="/items/add">Add Item</Link></li>
                    <li><Link to="/items/list">View Items</Link></li>
                </ul>
            </div>
        </div>
    );
};

export default HomePage;
