// src/Components/PurchaseOrder/PurchaseOrderList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './PurchaseOrderList.css'; // Make sure this file exists and is styled accordingly
import { useNavigate } from 'react-router-dom';

const PurchaseOrderList = () => {
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate(); // Correct placement inside the component

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('/api/purchase-orders');
                setOrders(response.data);
            } catch (error) {
                console.error('Error fetching purchase orders:', error);
            }
        };
        fetchOrders();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this purchase order?')) {
            try {
                await axios.delete(`/api/purchase-orders/${id}`);
                setOrders(orders.filter(order => order._id !== id));
                alert('Purchase order deleted successfully!');
            } catch (error) {
                console.error('Error deleting purchase order:', error);
            }
        }
    };

    return (
        <div className="purchase-order-list">
            <h1>Purchase Orders</h1>
            <ul>
                {orders.map(order => (
                    <li key={order._id}>
                        Order No: {order.orderNo} - Supplier: {order.supplier ? order.supplier.supplierName : 'N/A'}
                        <button onClick={() => handleDelete(order._id)}>Delete</button>
                        <button onClick={() => navigate(`/purchase-orders/update/${order._id}`)}>Update</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PurchaseOrderList;
